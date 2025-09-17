import { mqtt, iot } from "aws-iot-device-sdk-v2";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const REGION = import.meta.env.VITE_COGNITO_REGION;
const IDENTITY_POOL_ID = import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID;
const IOT_ENDPOINT = import.meta.env.VITE_AWS_IOT_ENDPOINT;

let mqttConnection = null;

export async function getAwsCredentials(idToken) {
  const client = new CognitoIdentityClient({ region: REGION });
  const provider = fromCognitoIdentityPool({
    client,
    identityPoolId: IDENTITY_POOL_ID,
    logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${
        import.meta.env.VITE_COGNITO_USERPOOL_ID
      }`]: idToken,
    },
  });

  const creds = await provider();
  // console.log("ID Token:", idToken);
  // console.log("✅ Obtained AWS credentials:", creds);
  return provider();
}

export async function connectToAwsIot(creds, onMessageCallback) {
  if (!creds) throw new Error("Missing AWS credentials!");

  const config =
    iot.AwsIotMqttConnectionConfigBuilder.new_builder_for_websocket()
      .with_clean_session(true)
      .with_client_id(`webclient-${Date.now()}`)
      .with_endpoint(IOT_ENDPOINT)
      .with_credentials(
        REGION,
        creds.accessKeyId,
        creds.secretAccessKey,
        creds.sessionToken
      )
      .build();

  const client = new mqtt.MqttClient();
  mqttConnection = client.new_connection(config);

  await mqttConnection.connect();
  // console.log("✅ Connected to AWS IoT with endpoint:", IOT_ENDPOINT);

  await mqttConnection.subscribe(
    "devices/+/data",
    mqtt.QoS.AtLeastOnce,
    (topic, payload) => {
      const message = new TextDecoder().decode(payload);
      // console.log("📥 Message received:");
      // console.log("   ▶ Topic:", topic);
      // console.log("   ▶ Payload:", message);

      if (onMessageCallback) onMessageCallback({ topic, message });
    }
  );

  return mqttConnection;
}
