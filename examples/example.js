const { DataLab } = require('./index');
const client = new DataLab({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZXhkYW50OTFAZ21haWwuY29tIiwib3JpZ2luIjpbInlvdWZvcm0uc2l0ZSJdLCJzZWNyZXRfa2V5IjoiZDdmZWQ1NTItOWY3OS00Y2JiLThjYzEtNzIyMzViZTY1MTJiIiwiYXBpX2FjY2Vzc190b2tlbiI6IjVlZDgxODQ4LWZmM2ItNDMyNi1iOTQ3LTM4NGUwYmM5YWMwOSIsImlhdCI6MTU3NzI5NTI0MH0.YOatXVrEwKxodMRYb2RNmuseruxe-VY0P88dhfgDVrk',
  secret_key: 'd7fed552-9f79-4cbb-8cc1-72235be6512b',
  api_access_token: '5ed81848-ff3b-4326-b947-384e0bc9ac09'
});

const doAsyncOperations = async () => {
  // Set authorization methods async
  // await client.setAuthToken({
  //   email: "alexdant91@gmail.com",
  //   password: "18Gmgaa2'"
  // });

  // Save data
  const saved = await client.data([
    {
      "title": "Harry Potter 2",
      "description": "The second Harry Potter book",
      "author": "J.K. Rowling",
      "isbn": "1231231-13312323231323-1245654356789876"
    }
  ]).save('books');

  // FindOne data
  const dataOne = await client.findOne('books', {
    _id: saved.docs[0]._id
  });
  // console.log(dataOne);

  // Find all data, also support query
  const data = await client.find('books');
  console.log(data);

  // Find and paginate all data, also support query
  const paginate = await client.paginate('books')
  // console.log(paginate);

  // Update existing data
  const updated = await client.data({
    "title": "Harry Potter 4"
  }).update('books', {
    _id: "323d36628463405c90314184f0b69733"
  });
  // console.log(updated);

  // Delete one existing data
  const deleteOne = await client.deleteOne('books', {
    _id: "323d36628463405c90314184f0b69733"
  });
  console.log(deleteOne);
}

doAsyncOperations();