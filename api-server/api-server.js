// Building API to use the queries all in place with fabric HL
// Add the express body-parser function and assign to variable names

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Settings for Hyperledger Fabric to interact with 
// the sample functions downloaded via
// https://github.com/hyperledger/fabric-samples.git
// using js function file system (fs) and path = directory
// path or tree structure.
const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// async to recieve callback from function main() in
app.get('/api/queryallcars', async function (req, res))) {
  try {
     // Create a new file system based wallet for managing identities.
     const walletPath = path.join(process.cwd(), 'wallet');
     const wallet = new FileSystemWallet(walletPath);
     console.log('Wallet path: ${walletPath}');
     // Check to see if we've already enrolled the user.
     const userExists = await wallet.exists('user1');
     if (!userExists) {
       console.log('An identity for the user "user1" does not exist in the wallet');
       console.log('Run the registerUser.js application before retrying');
         return;
  }
     // Create a new gateway for connecting to our peer node.
     const gateway = new Gateway();
     await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

     // Get the network (channel) our contract is deployed to.
     const network = await gateway.getNetwork('mychannel');

     // Get the contract from the network.
     const contract = network.getContract('fabcar');

     // Evaluate the specified transaction.
     // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
     // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
     const result = await contract.evaluateTransaction('queryAllCars');
     console.log('Transaction has been evaluated, result is: ${result.toString()}');
     res.status(200).json ({response: result.toString()});
    
  } catch (error) {
    console.error('Failed to evaluate transaction: ${error}');
    res.status(500).json({error: error});
    process.exit(1);
  }

});

app.get('/api/query/:car_index', async function (req, res)) {
  try {

     // Create a new file system based wallet for managing identities.
     const walletPath = path.join(process.cwd(), 'wallet');
     const wallet = new FileSystemWallet(walletPath);
     console.log(`Wallet path: ${walletPath}`);

     // Check to see if we've already enrolled the user.
     const userExists = await wallet.exists('user1');
     if (!userExists) {
       console.log('An identity for the user "user1" does not exist in the wallet');
       console.log('Run the registerUser.js application before retrying');
       return;
     }

     // Create a new gateway for connecting to our peer node.
     const gateway = new Gateway();
     await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

     // Get the network (channel) our contract is deployed to.
     const network = await gateway.getNetwork('mychannel');

     // Get the contract from the network.
     const contract = network.getContract('fabcar');

     // Submit the specified transaction.
     // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
     // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
     await contract.submitTransaction('queryCar', req.params.car_index);
     console.log('Transaction has been evaluate, result is: ${result.toString()}');
     res.status(200).json({response: result.toString()});

     } catch (error) {
       console.error('Failed to submit transaction: ${error}');
       res.status(500).json({error: error});
       process.exit(1);
     }
});

app.post('/api/addcar/', async function (req, res)) {
  try {
       // Create a new file system based wallet for managing identities.
       const walletPath = path.join(process.cwd(), 'wallet');
       const wallet = new FileSystemWallet(walletPath);
       console.log('Wallet path: ${walletPath}');
       
       // Check to see if we've already enrolled the user.
       const userExists = await wallet.exists('user1');
       if (!userExists) {
         console.log('An identity for the user "user1" does not exist in the wallet');
         return;
       } 

       // Check to see if we've already enrolled the admin user.
       const adminExists = await wallet.exists('admin');
       if (!adminExists) {
         console.log('An identity for the admin user "admin" does not exist in the wallet');
         console.log('Run the enrollAdmin.js application before retrying');
         return;
       }
       
       // Create a new gateway for connecting to our peer node.
       const gateway = new Gateway();
       await gateway.connect(ccp, { wallet, identity: 'user1',  discovery: { enabled: false } });
       
       // Get the network (channel) our contract is deployed to.
       const network = await gateway.getNetwork('mychannel');
       
       // Get the contract from the network.
       const contract = network.getContract('fabcar');
       
       // Submit the specified transaction.
       // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
       // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
       await contract.submitTransaction('createCar', req.body.carid, req.body.make, req.body.model, req.body.colour, req.body.owner);
       console.log('Transaction has been submitted');
       res.send('Transaction has been submitted');
       
       // Disconnect from the gateway.
       await gateway.disconnect();  
       } catch (error) {
         console.error('Failed to evaulate transaction: ${error}');
         process.exit(1);
       }
});

app.put('/api/changeowner/:car_index', aysnc function (req, res)) {
  try {

      // Create a new file system based wallet for managing identities.
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);
      console.log('Wallet path: ${walletPath}');
      
      // Check to see if we've already enrolled the user.
      const userExists = await wallet.exists('user1');
      if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
      }

     // Create a new gateway for connecting to our peer node.
     const gateway = new Gateway();
     await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

     // Get the network (channel) our contract is deployed to.
     const network = await gateway.getNetwork('mychannel');

     // Get the contract from the network.
     const contract = network.getContract('fabcar');

     // Submit the specified transaction.
     // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
     // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
     await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.owner);
     console.log('Transaction has been submitted');
     res.send('Transaction has been submitted');
     
     // Disconnect from the gateway.
     await gateway.disconnect();

     } catch (error) {
        console.error('Failed to submit transaction: ${error}');
        process.exit(1);
    } 
});

app.listen(8080);

