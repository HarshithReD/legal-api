const express = require('express');
const app = express();
const Router=express.Router();
const path=require('path');
const fs = require('fs');
var Web3 = require('web3');
const Ethereumjs=require('ethereumjs-tx');
const keythereum=require('keythereum');
const bodyParser=require('body-parser');

var jsonparser=bodyParser.json();
app.use(jsonparser);
  var web3 = new Web3();
  // web3 = new Web3(new Web3.providers.HttpProvider("http://128.199.129.139:9090"));
  web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/txaAN5QHgGh50svNsBKY"));
     // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


var abi=
[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroyToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_of",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "sendEtherTransaction",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "total_tokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			}
		],
		"name": "getEtherBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
];
var contract_address="0x50dcbe878df9b2270d8339adc06f97502bd092be";
var contract_instance=web3.eth.contract(abi).at(contract_address);

//general operations///////////////////////

Router.post('/api/getTransactionStatus',jsonparser,(request,response)=>{
	var hash=request.body.txnHash;
	 var res=web3.eth.getTransaction(hash);
	 response.json(res);
});
Router.post('/api/historyTransaction',jsonparser, (req, response)=>{
	var address=req.body.address;
	
	
	response.redirect('https://rinkeby.etherscan.io/tx/'+address);
	
});



//wallet operations///////////////////////

Router.post('/api/unlockAccount',jsonparser, (req, response)=>{
	var address=req.body.address;
	var pass = req.body.password;
	
	var result=web3.personal.unlockAccount(address,pass);
	response.json(result);
});
Router.post('/api/lockAccount',jsonparser, (req, response)=>{
	var address=req.body.address;
	
	
	var result=web3.personal.lockAccount(address);
	response.json(result);
});
Router.post('/api/createLocalEtherAccount',jsonparser,(request,response)=>{
	console.log(web3.isConnected(), web3.currentProvider);
	var password=request.body.password;
	var res=web3.personal.newAccount(password);
	response.json(res);
});
Router.post('/api/importFile',(request,response)=>{
	var address=request.body.address;
	var datadir=request.body.datadir;
	keythereum.importFromFile(address, datadir, function (keyObject) {
  			response.json({"result":true});
	});
});
Router.post('/api/importFileLocal',(request,response)=>{
	var address=request.body.address;
	var datadir=request.body.datadir;
	keythereum.importFromFile(address, datadir, function (keyObject) {
  			response.json({"address":keyObject.address});
	});
});
Router.post('/api/createEtherAccount',jsonparser,(request,response)=>{
	console.log(web3.isConnected(), web3.currentProvider);
	var password=request.body.password;
	 var res=web3.personal.newAccount(password);
	response.json(res);
});
//ether operations/////////////////////////////

Router.post('/api/transferEtherWithPrivate',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;
	var amount=request.body.values;
	var privateKey=request.body.private;
	 var Value = web3.toWei(amount,'ether');

	var pass = request.body.pass;
		console.log(from_account,to_account,Value,privateKey);
		 web3.eth.getTransactionCount(from_account, function (err, nonce) {
		 	console.log("Nonce ", nonce)
		var data=contract_instance.sendEtherTransaction.getData(to_account,Value);
		console.log(Value);
		var tx = new Ethereumjs({
			from:from_account,
		    	nonce:nonce,
		      gasPrice: web3.toHex(web3.toWei(5, 'gwei')),
		      gasLimit: 60000,
		      to: contract_address,
			  value: web3.toHex(Value),
		      data: data,
		      chainId:4
	    });
	    
	     tx.sign(new Buffer(privateKey, 'hex'));
	     var raw = '0x' + tx.serialize().toString('hex');
		    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
		    	if (err){
		    		console.log("Err : ",err)
		    	}
		      response.json(transactionHash);
		   
			});
		});

});
Router.post('/api/sendEtherTransaction',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;
	var amount=request.body.values;
	var Value = web3.toWei(amount,'ether');
	var pass = request.body.pass;
	console.log(from_account,to_account,Value,pass);
	web3.personal.unlockAccount(from_account,pass,1500);
	contract_instance.sendEtherTransaction(to_account,Value,{from:from_account,gas:95000,value:Value},function(err,res){
		if(err) throw err;
		response.json({"txnHash":res});
		
	});
});



Router.post('/api/getEtherBalance',jsonparser,(request,response)=>{
	var account_address=request.body.ether_address;
	contract_instance.getEtherBalance(account_address,function(err,res){
		if(err) throw err;
		response.json({"balance":web3.fromWei(res, 'ether')});
	});
});




//token operations//////////////////////////////



Router.post('/api/getBalance',(request,response)=>{
	var account=request.body.ether_address;
	console.log(account);
	contract_instance.balanceOf(account,function(err,res){
		response.json({"balance":res});
	});
});

Router.post('/api/transferTo',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	console.log('transferto',from_account,to_account,amount,pass);
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.transfer(to_account,amount,{from:from_account},function(err,res){
		if (err) throw err;
		response.json(res);

	});
});
Router.post('/api/transferToWithPrivate',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	var privateKey=request.body.private;
	console.log('transferto',from_account,to_account,amount,pass);
	 web3.eth.getTransactionCount(from_account, function (err, nonce) {
		 console.log("Nonce ", nonce)
		var data=contract_instance.transfer.getData(to_account,amount);
	
		var tx = new Ethereumjs({
			from:from_account,
		    	nonce:nonce,
		      gasPrice: web3.toHex(web3.toWei(5, 'gwei')),
		      gasLimit: 60000,
		      to: contract_address,
			  value: 0,
		      data: data,
		      chainId:4
	    });
	    
	     tx.sign(new Buffer(privateKey, 'hex'));
	     var raw = '0x' + tx.serialize().toString('hex');
		    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
		    	if (err){
		    		console.log("Err : ",err)
		    	}
		      response.json({"result":true,"txnHash":transactionHash});
		   
	});
		});
});

Router.post('/api/transferFrom',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	var spender=request.body.spender;
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	console.log('transferto',from_account,to_account,amount,pass);
	web3.personal.unlockAccount(spender,pass);
	contract_instance.transferFrom(from_account,to_account,amount,{from:spender},function(err,res){
		if (err) throw err;
		response.json(res);

	});
});

Router.post('/api/transferFromWithPrivate',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	var spender=request.body.spender;
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	var privateKey=request.body.private;
	console.log('transferto',from_account,to_account,amount,pass);
	 web3.eth.getTransactionCount(from_account, function (err, nonce) {
		 console.log("Nonce ", nonce)
		var data=contract_instance.transferFrom.getData(from_account,to_account,amount);
		var tx = new Ethereumjs({
			from:spender,
		    	nonce:nonce,
		      gasPrice: web3.toHex(web3.toWei(5, 'gwei')),
		      gasLimit: 60000,
		      to: contract_address,
			  value: 0,
		      data: data,
		      chainId:4
	    });
	    
	     tx.sign(new Buffer(privateKey, 'hex'));
	     var raw = '0x' + tx.serialize().toString('hex');
		    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
		    	if (err){
		    		console.log("Err : ",err)
		    	}
		      response.json({"result":true,"txnHash":transactionHash});
		   
			});
		});
});
Router.post('/api/approve',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.approve(to_account,amount,{from:from_account},function(err,res){
		if (err) throw err;
		response.json(res);

	})
});
Router.post('/api/approveWithPrivate',jsonparser,(request,response)=>{
	var from_account=request.body.from;

	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	var privateKey=request.body.private;
	console.log('transferto',from_account,to_account,amount,pass);
	 web3.eth.getTransactionCount(from_account, function (err, nonce) {
		 console.log("Nonce ", nonce);
		var data=contract_instance.approve.getData(to_account,amount);
		var tx = new Ethereumjs({
			from:from_account,
		    	nonce:nonce,
		      gasPrice: web3.toHex(web3.toWei(5, 'gwei')),
		      gasLimit: 60000,
		      to: contract_address,
			  value: 0,
		      data: data,
		      chainId:4
	    });
	    
	     tx.sign(new Buffer(privateKey, 'hex'));
	     var raw = '0x' + tx.serialize().toString('hex');
		    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
		    	if (err){
		    		console.log("Err : ",err)
		    	}
		      response.json({"result":true,"txnHash":transactionHash});
		   
			});
		});
});
Router.post('/api/increaseApproval',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.increaseAllowance(to_account,amount,{from:from_account},function(err,res){
		if (err) throw err;
		response.json(res);

	});
});
Router.post('/api/increaseApprovalWithPrivate',jsonparser,(request,response)=>{
	var from_account=request.body.from;

	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	var privateKey=request.body.private;
	console.log('transferto',from_account,to_account,amount,pass);
	 web3.eth.getTransactionCount(from_account, function (err, nonce) {
		 console.log("Nonce ", nonce)
		var data=contract_instance.increaseAllowance.getData(to_account,amount);
		var tx = new Ethereumjs({
			from:from_account,
		    	nonce:nonce,
		      gasPrice: web3.toHex(web3.toWei(5, 'gwei')),
		      gasLimit: 60000,
		      to: contract_address,
			  value: 0,
		      data: data,
		      chainId:4
	    });
	    
	     tx.sign(new Buffer(privateKey, 'hex'));
	     var raw = '0x' + tx.serialize().toString('hex');
		    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
		    	if (err){
		    		console.log("Err : ",err)
		    	}
		      response.json({"result":true,"txnHash":transactionHash});
		   
			});
		});
});
Router.post('/api/decreaseApproval',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	
	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.decreaseAllowance(to_account,amount,{from:from_account},function(err,res){
		if (err) throw err;
		response.json(res);

	})
});
Router.post('/api/decreaseApprovalWithPrivate',jsonparser,(request,response)=>{
	var from_account=request.body.from;

	var to_account=request.body.to;
	var amount=request.body.value;
	var pass = request.body.password;
	var privateKey=request.body.private;
	console.log('transferto',from_account,to_account,amount,pass);
	 web3.eth.getTransactionCount(from_account, function (err, nonce) {
		 console.log("Nonce ", nonce)
		var data=contract_instance.decreaseAllowance.getData(to_account,amount);
		var tx = new Ethereumjs({
			from:from_account,
		    	nonce:nonce,
		      gasPrice: web3.toHex(web3.toWei(5, 'gwei')),
		      gasLimit: 60000,
		      to: contract_address,
			  value: 0,
		      data: data,
		      chainId:4
	    });
	    
	     tx.sign(new Buffer(privateKey, 'hex'));
	     var raw = '0x' + tx.serialize().toString('hex');
		    web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
		    	if (err){
		    		console.log("Err : ",err)
		    	}
		      response.json({"result":true,"txnHash":transactionHash});
		   
			});
		});
});
Router.post('/api/allowance',jsonparser,(request,response)=>{
	var from_account=request.body.from;
	
	var to_account=request.body.to;
	contract_instance.allowance(from_account,to_account,function(err,res){
		if (err) throw err;
		response.json(res);

	});
});
// Router.post('/api/purchaseToken',jsonparser,(request,response)=>{
// 	var from_account=request.body.from;
// 	var to_account=request.body.to;
// 	var amount=request.body.value;
// 	var pass = request.body.password;
// 	console.log('transferto',from_account,to_account,amount,pass);
	

// 	var convertInEther=amount;
// 	console.log(convertInEther);
// 	var convertToWei = web3.toWei(amount,'ether')*0.000100 ;
// 	web3.personal.unlockAccount(to_account,pass,1500);
// console.log(convertToWei);

// 	contract_instance.sendEtherTransaction(from_account,convertToWei,{from:to_account,value:convertToWei},function(err,res){
// 		if(err) throw err;
// 		web3.personal.unlockAccount(from_account,pass,1500);
// 	contract_instance.transfer(to_account,amount,{from:from_account},function(err,res){
// 		if(err) throw err;
// 		response.json({"txn":res});
// 	});
		
// 	});


// });





//Admin operations///////////////////////////

// Router.post('/mint',(request,response)=>{
// 	var from_account=request.body.from;

// 	var amount=request.body.amount;
// 	var pass = request.body.password;
// 	web3.personal.unlockAccount(from_account,pass);
// 	contract_instance.mint(amount,{from:from_account,gas:95000},function(err,res){
// 		if(err) throw err;
// 		response.json({"message":"Tokens minted!!"});
// 	});
// });
// Router.post('/burn',(request,response)=>{
// 	var from_account=request.body.from;

// 	var amount=request.body.amount;
// 	var pass = request.body.password;
// 	web3.personal.unlockAccount(from_account,pass);
// 	contract_instance.burn(amount,{from:from_account,gas:95000},function(err,res){
// 		if(err) throw err;
// 		response.json({"message":"Tokens burned!!"});
// 	});
// });

// app.post('/destroyToken',(request,response)=>{
// 	var account=request.body.from;
// 	contract_instance.destroyToken(account,function(err,res){
// 		if(err) throw err;
// 		response.json({"message":"Token has been destroyed!!"});
// 	});
// });
app.use(Router);

app.listen(3003);