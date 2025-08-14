import type { ILanguageData } from "../types";

export const docsDatas: ILanguageData[] = [
  {
    language: "TypeScript",
    languageId: "ts",
    versions: [
      {
        version: "v1.0.0",
        versionId: "v1.0.0",
        apis: {
          id: `ts-v1.0.0`,
          claasNames: [
            {
              classId: "ts-UniversalClient",
              className: "UniversalClient",
              description: [
                "UniversalClient is a versatile client for making calls to various server types",
                "such as HTTP, gRPC, and WebSocket. It supports middleware for modifying context",
                "before each call, allowing for flexible request handling and configuration.  ",
              ],
              constructor: [
                {
                  constructorId: "ts-UniversalClient-constructor",
                  name: "UniversalClient()",
                  description: [
                    "Creates a new instance of UniversalClient.",
                    "You can pass an optional configuration object to set up the client.",
                  ],
                  parameters: [
                    {
                      name: "config",
                      type: "UniversalClientConfig",
                      description: [
                        "Optional configuration for the UniversalClient.",
                        "If not provided, default settings will be used.",
                      ],
                    },
                  ],
                  codeExample: `
const config: UniversalClientConfig = {
      endpoints: {
        createUser: {
          protocol: "grpc",
          host: "localhost",
          port: 50051,
          serviceName: "user.UserService",
          methodName: "CreateUser",
          protoFile: "./protos/user.proto",
        },
      },
    };
const client = new UniversalClient(config);`.trim(),
                },
              ],
              methods: [
                {
                  methodId: "ts-UniversalClient-call",
                  name: "call()",
                  description: [
                    "Makes a call to the specified endpoint with the provided data.",
                    "The method automatically determines the protocol and handles the request accordingly.",
                  ],
                  parameters: [
                    {
                      name: "endpoint",
                      type: "string",
                      description: [
                        "The endpoint to call, defined in the configuration.",
                      ],
                    },
                    {
                      name: "payload",
                      type: "any",
                      description: [
                        "The data to send with the request. The type depends on the endpoint's configuration.",
                      ],
                    },
                    {
                      name: "options",
                      type: "any",
                      description: [
                        "Optional call options, such as timeout or additional headers.",
                      ],
                    },
                  ],
                  returnType: "Promise<T>",
                  returnDescription:
                    "A promise that resolves with the response data.",
                  codeExample: `
 const response = await client.call("createUser", {
   name: "John Doe",
   email: "xyz@example.com",
 });
 console.log(response);`.trim(),
                },
              ],
            },
          ],
          methods: [
            {
              methodId: "ts-UniversalClient-call",
              name: "call()",
              description: [
                "Makes a call to the specified endpoint with the provided data.",
                "The method automatically determines the protocol and handles the request accordingly.",
              ],
              parameters: [
                {
                  name: "endpoint",
                  type: "string",
                  description: [
                    "The endpoint to call, defined in the configuration.",
                  ],
                },
                {
                  name: "payload",
                  type: "any",
                  description: [
                    "The data to send with the request. The type depends on the endpoint's configuration.",
                  ],
                },
                {
                  name: "options",
                  type: "any",
                  description: [
                    "Optional call options, such as timeout or additional headers.",
                  ],
                },
              ],
              returnType: "Promise<T>",
              returnDescription:
                "A promise that resolves with the response data.",
              codeExample: `
 const response = await client.call("createUser", {
   name: "John Doe",
   email: "xyz@example.com",
 });
 console.log(response);`.trim(),
            },
          ],
        },
      },
      {
        version: "v2.0.1",
        versionId: "v2.0.1",
        apis: {
          id: `ts-v2.0.1`,
          claasNames: [
            {
              classId: "ts-UniversalClient",
              className: "UniversalClient",
              description: [
                "UniversalClient is a versatile client for making calls to various server types",
                "such as HTTP, gRPC, and WebSocket. It supports middleware for modifying context",
                "before each call, allowing for flexible request handling and configuration.  ",
              ],
              constructor: [
                {
                  constructorId: "ts-UniversalClient-constructor",
                  name: "UniversalClient()",
                  description: [
                    "Creates a new instance of UniversalClient.",
                    "You can pass an optional configuration object to set up the client.",
                  ],
                  parameters: [
                    {
                      name: "config",
                      type: "UniversalClientConfig",
                      description: [
                        "Optional configuration for the UniversalClient.",
                        "If not provided, default settings will be used.",
                      ],
                    },
                  ],
                  codeExample: `
const config: UniversalClientConfig = {
      endpoints: {
        createUser: {
          protocol: "grpc",
          host: "localhost",
          port: 50051,
          serviceName: "user.UserService",
          methodName: "CreateUser",
          protoFile: "./protos/user.proto",
        },
      },
    };
const universalClient = new UniversalClient(config);`.trim(),
                },
              ],
              example:`
import express, { Request, Response } from 'express';
import path from 'path';
import { UniversalClient, UniversalClientConfig, SupportedServerTypes } from '@ananay-nag/universal-client';
const PORT = 4000;
const config: UniversalClientConfig = {
  endpoints: {
    createUser: {
      serverType: SupportedServerTypes.GRPC,
      host: "localhost",
      port: 50051,
      protoFile: path.resolve(__dirname, "../protos/user.proto"),
      serviceName: "UserService",
      methodName: "CreateUser",
      packageName: "user",
    },
    sendMessage: {
      serverType: SupportedServerTypes.SOCKETIO,
      host: "http://localhost",
      port: 3002,
      event: "sendMessage",
    },
    signup: {
      serverType: SupportedServerTypes.HTTP,
      host: "http://localhost:4000",
      path: "/api/signup",
      methodName: "POST",
    },
  },
};

const universalClient = new UniversalClient(config);

const app = express();
app.use(express.json());

// Dummy signup HTTP endpoint (to demo HTTP call)
app.post('/api/signup', (req: Request, res: Response) => {
  console.log('Received signup:', req.body);
  res.json({ success: true, user: req.body.username });
});

app.post('/register', async (req: Request, res: Response) => {
  try {
    console.time('gRPC Call Time');
    const { username, email } = req.body;
    const user = await universalClient.call('createUser', { username, email }).catch((err: any) => {
      return {
        error: 'Failed to create user',
        details: err.message,
      }
    });
    const msgResp = await universalClient.call('sendMessage', { message: 'Welcome from API, {username} !' });
    const signupResp = await universalClient.call('signup', { username, email, password: 'defaultPass' });
    console.timeEnd('gRPC Call Time');
    res.json({
      grpcUser: user,
      msgResponse: msgResp,
      signupResponse: signupResp,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('HTTP API server running on port 4000');
});`.trim(),
              methods: [
                {
                  methodId: "ts-UniversalClient-call",
                  name: "call()",
                  description: [
                    "Makes a call to the specified endpoint with the provided data.",
                    "The method automatically determines the protocol and handles the request accordingly.",
                  ],
                  parameters: [
                    {
                      name: "endpoint",
                      type: "string",
                      description: [
                        "The endpoint to call, defined in the configuration.",
                      ],
                    },
                    {
                      name: "payload",
                      type: "any",
                      description: [
                        "The data to send with the request. The type depends on the endpoint's configuration.",
                      ],
                    },
                    {
                      name: "options",
                      type: "any",
                      description: [
                        "Optional call options, such as timeout or additional headers.",
                      ],
                    },
                  ],
                  returnType: "Promise<T>",
                  returnDescription:
                    "A promise that resolves with the response data.",
                  codeExample: `
 const response = await universalClient.call("createUser", {
   name: "John Doe",
   email: "xyz@example.com",
 });
 console.log(response);`.trim(),
                },
                {
                  methodId: "ts-UniversalClient-getClient",
                  name: "getClient()",
                  description: [
                    "Get a specific client instance for an endpoint",
                    "This is useful for direct access to the client without making a call",
                  ],
                  parameters: [
                    {
                      name: "endpointKey",
                      type: "string",
                      description: ["The key for the endpoint in the config."],
                    },
                  ],
                  returnType: "any",
                  returnDescription:
                    "The client instance for the specified endpoint",
                  codeExample: `
const client = universalClient.getClient('myEndpoint');`.trim(),
                },
                {
                  methodId: "ts-UniversalClient-close",
                  name: "close()",
                  description: [
                    "Gracefully close all open clients that support close()",
                    "This method iterates through all registered plugins and calls their close method if it exists",
                    "It also clears the cache for each server type.",
                  ],
                  parameters: [],
                  returnType: "Promise<void>",
                  returnDescription: "returns nothing.",
                  codeExample: `
await universalClient.close();`.trim(),
                },
                {
                  methodId: "ts-UniversalClient-useServerType",
                  name: "useServerType()",
                  description: [
                    "Register a user-defined custom serverType plugin",
                    "This method allows you to extend the functionality of the UniversalClient",
                    "by adding support for custom server types.",
                  ],
                  parameters: [
                    {
                      name: "serverType",
                      type: "SupportedServerType",
                      description: [
                        "The type of server (e.g., 'grpc', 'http' , 'custom)",
                      ],
                    },
                    {
                      name: "plugin",
                      type: "ServerTypeClient",
                      description: [
                        "The plugin instance implementing the ServerTypeClient interface.",
                      ],
                    },
                  ],
                  returnType: "void",
                  returnDescription: "returns nothing.",
                  codeExample: `
const myCustomPlugin: ServerTypeClient = {
  serverType: 'myCustomType',
  createClient: async (address, endpoint) => { /* ... *\/ },
  call: async (client, ctx) => { /* ... *\/ },
};
universalClient.useServerType('myCustomType', myCustomPlugin);`.trim(),
                },
                {
                  methodId: "ts-UniversalClient-useMiddleware",
                  name: "useMiddleware()",
                  description: [
                    "Register user-defined middleware.",
                    "his allows users to add custom logic that runs before and after calls.",
                  ],
                  parameters: [
                    {
                      name: "middleware",
                      type: "MiddlewarePlugin",
                      description: [
                        "The middleware plugin instance implementing the MiddlewarePlugin interface.",
                      ],
                    },
                  ],
                  returnType: "void",
                  returnDescription: "returns nothing.",
                  codeExample: `
const myMiddleware: MiddlewarePlugin = {
  name: 'name',
  beforeCall: async (ctx) => { /* custom logic before call *\/ },
  afterCall: async (ctx, result) => { /* custom logic after call *\/ },
};
universalClient.useMiddleware(myMiddleware);`.trim(),
                },
              ],
            },
          ],
          methods: [
            {
              methodId: "ts-UniversalClient-AuthJwtPlugin",
              name: "AuthJwtPlugin()",
              description: [
                "AuthJwtPlugin is a middleware plugin that adds a JWT token to the request context.",
                "It supports HTTP, gRPC, and Socket.IO server types.",
              ],
              parameters: [
                {
                  name: "getToken",
                  type: "function",
                  description: [
                    "A function that returns the JWT token as a string",
                  ],
                },
              ],
              returnType: "MiddlewarePlugin",
              returnDescription:
                "A MiddlewarePlugin that modifies the request context to include the JWT token.",
              codeExample: `
 const jwtPlugin = function() {
  return 'your-jwt-token';
};
const universalClient = new UniversalClient(config);
// Use the plugin with the universal client  
universalClient.useMiddleware(AuthJwtPlugin(jwtPlugin));`.trim(),
            },
          ],
          examples: [
            {
              exampleId: "ts-UniversalClient-main-example",
              exampleName: "UniversalClient Example",
              description: [
                "This example demonstrates how to use the UniversalClient to make calls to different server types.",
                "It shows how to configure the client, make calls, and handle responses.",
              ],
              codeExample: `
import express, { Request, Response } from 'express';
import path from 'path';
import { UniversalClient, UniversalClientConfig, SupportedServerTypes } from '@ananay-nag/universal-client';
const PORT = 4000;
const config: UniversalClientConfig = {
  endpoints: {
    createUser: {
      serverType: SupportedServerTypes.GRPC,
      host: "localhost",
      port: 50051,
      protoFile: path.resolve(__dirname, "../protos/user.proto"),
      serviceName: "UserService",
      methodName: "CreateUser",
      packageName: "user",
    },
    sendMessage: {
      serverType: SupportedServerTypes.SOCKETIO,
      host: "http://localhost",
      port: 3002,
      event: "sendMessage",
    },
    signup: {
      serverType: SupportedServerTypes.HTTP,
      host: "http://localhost:4000",
      path: "/api/signup",
      methodName: "POST",
    },
  },
};

const universalClient = new UniversalClient(config);

const app = express();
app.use(express.json());

// Dummy signup HTTP endpoint (to demo HTTP call)
app.post('/api/signup', (req: Request, res: Response) => {
  console.log('Received signup:', req.body);
  res.json({ success: true, user: req.body.username });
});

app.post('/register', async (req: Request, res: Response) => {
  try {
    console.time('gRPC Call Time');
    const { username, email } = req.body;
    const user = await universalClient.call('createUser', { username, email }).catch((err: any) => {
      return {
        error: 'Failed to create user',
        details: err.message,
      }
    });
    const msgResp = await universalClient.call('sendMessage', { message: 'Welcome from API, {username} !' });
    const signupResp = await universalClient.call('signup', { username, email, password: 'defaultPass' });
    console.timeEnd('gRPC Call Time');
    res.json({
      grpcUser: user,
      msgResponse: msgResp,
      signupResponse: signupResp,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log('HTTP API server running on port 4000');
});`.trim(),
            }
          ]
        },
      },
    ],
  },
];
