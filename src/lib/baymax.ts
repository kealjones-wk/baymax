import { App } from '@slack/bolt';
import { addChannelFunnel, getChannelsFor } from './store';

/**
 * BaymaxBot's base class that you initialize with any extensions.
 */
class BaymaxBot {
  boltClient: App;
  extensions = [];
  constructor({ extensions = null } = {}) {
    this.extensions = extensions;
    this.boltClient = new App({
      token: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET
    });

    this.boltClient.error((error) => {
      // Check the details of the error to handle cases where you should retry sending a message or stop the app
      // tslint:disable-next-line: no-console
      console.error(error);
    });

    this.boltClient.command('/funnel', async ({ command, ack, say }) => {
      // Acknowledge command request
      ack();
      const channels = command.text.split(' ');
      const toChannel = channels.shift();
      addChannelFunnel(toChannel, channels);
      say(`${JSON.stringify(getChannelsFor(toChannel))}`);
    });

    this.boltClient.command('/what', async ({ command, ack, say }) => {
      // Acknowledge command request
      ack();

      say(`idk`);
    });
  }

  start({ port = null } = {}) {
    const PORT = port || process.env.PORT || 3000;
    // Start baymax
    this.boltClient.start(PORT);
    // tslint:disable-next-line: no-console
    console.log('Starting baymax @ localhost:' + PORT);
    // tslint:disable-next-line: no-console
    console.log('Hello. I am Baymax, your personal support chat companion.');
  }
}


// this.boltClient.action<BlockAction>(/level[0-9]/, async ({ body, ack, respond }) => {
//   // Acknowledge the action
//   ack();
//   respond(`<@${body.user.id}> clicked: ${body.actions[0].action_id}`);
// });

// // Listens to incoming messages that contain "hello"
// this.boltClient.message('ow', async ({ event, message, context }) => {
//   try {
//     const result = await this.boltClient.client.chat.postEphemeral({
//       token: context.botToken,
//       channel: event.channel,
//       user: event.user,
//       text: '',
//       blocks: [
//         {
//           type: "section",
//           text: {
//             type: "mrkdwn",
//             text: `<@${message.user}>, I was alerted that you need medical attention when you said, "ow".\nOn a scale of 1 to ten, how would you rate your pain?!`
//           }
//         },
//         {
//           type: "actions",
//           elements: [
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":grinning:",
//                 emoji: true
//               },
//               action_id: "level1",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":yum:",
//                 emoji: true
//               },
//               action_id: "level2",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":slightly_smiling_face:",
//                 emoji: true
//               },
//               action_id: "level3",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":neutral_face:",
//                 emoji: true
//               },
//               action_id: "level4",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":no_mouth:",
//                 emoji: true
//               },
//               action_id: "level5",
//             },
//           ]
//         },
//         {
//           type: "actions",
//           elements: [
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":slightly_frowning_face:",
//                 emoji: true
//               },
//               action_id: "level6",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":white_frowning_face:",
//                 emoji: true
//               },
//               action_id: "level7",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":anguished:",
//                 emoji: true
//               },
//               action_id: "level8",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":tired_face:",
//                 emoji: true
//               },
//               action_id: "level9",
//             },
//             {
//               type: "button",
//               text: {
//                 type: "plain_text",
//                 text: ":face_with_symbols_on_mouth:",
//                 emoji: true
//               },
//               action_id: "level10",
//             },
//           ]
//         }]
//     });
//     console.log(result);
//   }
//   catch (error) {
//     console.error(error);
//   }
// });

export const baymax = new BaymaxBot();




