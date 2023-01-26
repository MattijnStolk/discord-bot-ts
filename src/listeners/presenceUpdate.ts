import { Client } from 'discord.js'

let jamesID: string = '778382277952536596'
let nickID: string = '307203798651371521'

export default (client: Client): void => {
  client.on('presenceUpdate', async (oldPresence, newPresence) => {
    console.log(newPresence)
    if (!newPresence.activities) return
    newPresence.activities.forEach((activity) => {
      console.log(activity)
      // if (activity.type == "STREAMING") {
      //     console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
      // };
    })
  })

  //this should be on specific users, so..
  // let james = client.users
  //     .fetch(jamesID)
  //     .then((data) => {
  //         console.log(data)
  //     })

  // client.on("presenceUpdate", async ( ) => {
  // if (!newPresence.activities) return false;
  // newPresence.activities.forEach(activity => {
  //     if (activity.type == "STREAMING") {
  //         console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
  //     };
  // })
  // })
}
