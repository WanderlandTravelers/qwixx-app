import * as serviceWorker from './serviceWorker';

describe('serviceWorker', () => {
    let originalNavigator;
    let originalWindow;
    let originalEnv;
    let originalPublicUrl;
    let originalFetch;

    beforeEach(() => {
        // Save original values
        originalNavigator = global.navigator;
        originalWindow = global.window;
        originalEnv = process.env.NODE_ENV;
        originalPublicUrl = process.env.PUBLIC_URL;
        originalFetch = global.fetch;

        // Clear console mocks
        jest.clearAllMocks();
        console.log = jest.fn();
        console.error = jest.fn();
    });

    afterEach(() => {
        // Restore original values
        global.navigator = originalNavigator;
        global.window = originalWindow;
        process.env.NODE_ENV = originalEnv;
        process.env.PUBLIC_URL = originalPublicUrl;
        global.fetch = originalFetch;
    });

    describe('module exports', () => {
        test('exports register function', () => {
            expect(typeof serviceWorker.register).toBe('function');
        });

        test('exports unregister function', () => {
            expect(typeof serviceWorker.unregister).toBe('function');
        });
    });

    describe('register', () => {
        test('does nothing in development mode', () => {
            process.env.NODE_ENV = 'development';
            expect(() => serviceWorker.register()).not.toThrow();
        });

        test('does nothing when serviceWorker is not supported', () => {
            process.env.NODE_ENV = 'production';
            Object.defineProperty(global, 'navigator', {
                value: {},
                writable: true,
                configurable: true,
            });
            expect(() => serviceWorker.register()).not.toThrow();
        });

        test('returns early when PUBLIC_URL origin differs from window origin', () => {
            process.env.NODE_ENV = 'production';
            process.env.PUBLIC_URL = 'https://cdn.example.com';

            const mockRegister = jest.fn();
            Object.defineProperty(global, 'navigator', {
                value: {
                    serviceWorker: {
                        register: mockRegister,
                        ready: Promise.resolve({}),
                    },
                },
                writable: true,
                configurable: true,
            });

            delete global.window.location;
            global.window.location = {
                hostname: 'localhost',
                origin: 'http://localhost:3000',
                href: 'http://localhost:3000/',
            };

            const addEventListenerMock = jest.fn();
            global.window.addEventListener = addEventListenerMock;

            serviceWorker.register();

            // Should not add event listener when origins don't match
            expect(addEventListenerMock).not.toHaveBeenCalled();
        });

        test('registers service worker in production with service worker support', () => {
            process.env.NODE_ENV = 'production';
            process.env.PUBLIC_URL = '';

            const mockRegister = jest.fn().mockResolvedValue({});
            const mockReady = Promise.resolve({});

            Object.defineProperty(global, 'navigator', {
                value: {
                    serviceWorker: {
                        register: mockRegister,
                        ready: mockReady,
                    },
                },
                writable: true,
                configurable: true,
            });

            delete global.window.location;
            global.window.location = {
                hostname: 'localhost',
                origin: 'http://localhost:3000',
                href: 'http://localhost:3000/',
            };

            const addEventListenerMock = jest.fn();
            global.window.addEventListener = addEventListenerMock;

            serviceWorker.register();

            expect(addEventListenerMock).toHaveBeenCalledWith('load', expect.any(Function));
        });
    });

    describe('service worker registration flow', () => {
        let mockRegister;
        let mockFetch;
        let loadCallback;

        beforeEach(() => {
            process.env.NODE_ENV = 'production';
            process.env.PUBLIC_URL = '';

            jest.clearAllMocks();
            console.log = jest.fn();
            console.error = jest.fn();

            mockRegister = jest.fn();
            mockFetch = jest.fn();
            global.fetch = mockFetch;

            Object.defineProperty(global, 'navigator', {
                value: {
                    serviceWorker: {
                        register: mockRegister,
                        controller: null,
                        ready: Promise.resolve({
                            unregister: jest.fn().mockResolvedValue(true),
                        }),
                    },
                },
                writable: true,
                configurable: true,
            });

            delete global.window.location;
            global.window.location = {
                hostname: 'localhost',
                origin: 'http://localhost:3000',
                href: 'http://localhost:3000/',
                reload: jest.fn(),
            };

            const addEventListenerMock = jest.fn((event, callback) => {
                if (event === 'load') {
                    loadCallback = callback;
                }
            });
            global.window.addEventListener = addEventListenerMock;
        });

        test('calls onSuccess callback when service worker installs for first time', async () => {
            const onSuccess = jest.fn();
            const config = { onSuccess };

            const mockRegistration = {
                installing: null,
                onupdatefound: null,
            };

            mockRegister.mockResolvedValue(mockRegistration);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            serviceWorker.register(config);
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            // Simulate update found
            const installingWorker = {
                state: 'installing',
                onstatechange: null,
            };
            mockRegistration.installing = installingWorker;

            if (mockRegistration.onupdatefound) {
                mockRegistration.onupdatefound();
            }

            // Simulate state change to installed
            installingWorker.state = 'installed';
            if (installingWorker.onstatechange) {
                installingWorker.onstatechange();
            }

            expect(console.log).toHaveBeenCalledWith('Content is cached for offline use.');
            expect(onSuccess).toHaveBeenCalledWith(mockRegistration);
        });

        test('calls onUpdate callback when service worker updates', async () => {
            const onUpdate = jest.fn();
            const config = { onUpdate };

            const mockRegistration = {
                installing: null,
                onupdatefound: null,
            };

            // Set existing controller to simulate an update scenario
            global.navigator.serviceWorker.controller = {};

            mockRegister.mockResolvedValue(mockRegistration);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            serviceWorker.register(config);
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            // Simulate update found
            const installingWorker = {
                state: 'installing',
                onstatechange: null,
            };
            mockRegistration.installing = installingWorker;

            if (mockRegistration.onupdatefound) {
                mockRegistration.onupdatefound();
            }

            // Simulate state change to installed
            installingWorker.state = 'installed';
            if (installingWorker.onstatechange) {
                installingWorker.onstatechange();
            }

            expect(console.log).toHaveBeenCalledWith(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
            );
            expect(onUpdate).toHaveBeenCalledWith(mockRegistration);
        });

        test('handles installingWorker being null', async () => {
            const mockRegistration = {
                installing: null,
                onupdatefound: null,
            };

            mockRegister.mockResolvedValue(mockRegistration);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            // Trigger onupdatefound with null installing worker
            if (mockRegistration.onupdatefound) {
                mockRegistration.onupdatefound();
            }

            // Should not throw - just verify no errors
            expect(true).toBe(true);
        });

        test('handles state change when worker is not in installed state', async () => {
            const mockRegistration = {
                installing: null,
                onupdatefound: null,
            };

            mockRegister.mockResolvedValue(mockRegistration);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            // Simulate update found with worker in different state
            const installingWorker = {
                state: 'activating',
                onstatechange: null,
            };
            mockRegistration.installing = installingWorker;

            if (mockRegistration.onupdatefound) {
                mockRegistration.onupdatefound();
            }

            if (installingWorker.onstatechange) {
                installingWorker.onstatechange();
            }

            // Should not log the success message for non-installed states
            expect(console.log).not.toHaveBeenCalledWith('Content is cached for offline use.');
        });

        test('handles registration error', async () => {
            const error = new Error('Registration failed');
            mockRegister.mockRejectedValue(error);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            expect(console.error).toHaveBeenCalledWith('Error during service worker registration:', error);
        });

        test('works without config callbacks', async () => {
            const mockRegistration = {
                installing: null,
                onupdatefound: null,
            };

            mockRegister.mockResolvedValue(mockRegistration);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            // Simulate update found
            const installingWorker = {
                state: 'installing',
                onstatechange: null,
            };
            mockRegistration.installing = installingWorker;

            if (mockRegistration.onupdatefound) {
                mockRegistration.onupdatefound();
            }

            // Simulate state change to installed
            installingWorker.state = 'installed';
            if (installingWorker.onstatechange) {
                installingWorker.onstatechange();
            }

            expect(console.log).toHaveBeenCalledWith('Content is cached for offline use.');
        });

        test('unregisters and reloads when service worker returns 404', async () => {
            mockFetch.mockResolvedValue({
                status: 404,
                headers: {
                    get: jest.fn().mockReturnValue('text/html'),
                },
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 50));

            expect(global.window.location.reload).toHaveBeenCalled();
        });

        test('unregisters and reloads when content-type is not javascript', async () => {
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('text/html'),
                },
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 50));

            expect(global.window.location.reload).toHaveBeenCalled();
        });

        test('registers service worker when valid javascript is found', async () => {
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            mockRegister.mockResolvedValue({
                installing: null,
                onupdatefound: null,
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 50));

            expect(mockRegister).toHaveBeenCalled();
        });

        test('logs offline message when fetch fails', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 50));

            expect(console.log).toHaveBeenCalledWith(
                'No internet connection found. App is running in offline mode.'
            );
        });

        test('logs service worker ready message on localhost', async () => {
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            mockRegister.mockResolvedValue({
                installing: null,
                onupdatefound: null,
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 50));

            expect(console.log).toHaveBeenCalledWith(
                'This web app is being served cache-first by a service ' +
                'worker. To learn more, visit https://bit.ly/CRA-PWA'
            );
        });

        test('handles both onSuccess and onUpdate callbacks being undefined', async () => {
            const mockRegistration = {
                installing: null,
                onupdatefound: null,
            };

            mockRegister.mockResolvedValue(mockRegistration);
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('application/javascript'),
                },
            });

            // Register without config
            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 20));

            // Simulate update found with controller (update scenario)
            global.navigator.serviceWorker.controller = {};
            const installingWorker = {
                state: 'installing',
                onstatechange: null,
            };
            mockRegistration.installing = installingWorker;

            if (mockRegistration.onupdatefound) {
                mockRegistration.onupdatefound();
            }

            installingWorker.state = 'installed';
            if (installingWorker.onstatechange) {
                installingWorker.onstatechange();
            }

            // Should log update message even without callback
            expect(console.log).toHaveBeenCalledWith(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
            );
        });

        test('handles content-type with javascript in it', async () => {
            mockFetch.mockResolvedValue({
                status: 200,
                headers: {
                    get: jest.fn().mockReturnValue('text/javascript; charset=utf-8'),
                },
            });

            mockRegister.mockResolvedValue({
                installing: null,
                onupdatefound: null,
            });

            serviceWorker.register();
            loadCallback();

            await new Promise(resolve => setTimeout(resolve, 50));

            // Should register because content-type contains 'javascript'
            expect(mockRegister).toHaveBeenCalled();
        });
    });

    describe('unregister', () => {
        test('does nothing when serviceWorker is not supported', () => {
            Object.defineProperty(global, 'navigator', {
                value: {},
                writable: true,
                configurable: true,
            });

            expect(() => serviceWorker.unregister()).not.toThrow();
        });

        test('calls unregister when serviceWorker is supported', async () => {
            const mockUnregister = jest.fn().mockResolvedValue(true);
            const mockRegistration = {
                unregister: mockUnregister,
            };

            Object.defineProperty(global, 'navigator', {
                value: {
                    serviceWorker: {
                        ready: Promise.resolve(mockRegistration),
                    },
                },
                writable: true,
                configurable: true,
            });

            await serviceWorker.unregister();

            await new Promise(resolve => setTimeout(resolve, 10));

            expect(mockUnregister).toHaveBeenCalled();
        });
    });
});
