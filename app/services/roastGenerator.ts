// async function createNewRecord(data: any) {
//     try {
//         const newRecord = await prisma.ApiKey.create({
//             data: {
//                 key: data.key,
//                 name: data.name,
//                 email: data.email,
//                 appType: data.appType,
//                 createdAt: Date.now(),
//             }
//         });
//         return newRecord;
//     }
//     catch (ex) {
//         console.log('error creating new record:', ex);
//     }
// }