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
                      type: "UniversalClientCallOptions",
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
                  type: "UniversalClientCallOptions",
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
    ],
  },
];
