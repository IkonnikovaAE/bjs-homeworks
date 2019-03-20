class Profile {
    constructor({
	    username: username,
	    name: {firstName: firstName, lastName: lastName},
	    password: password
    }){
	    this.username = username;
	    this.firstName = firstName;
	    this.lastName = lastName;
	    this.password = password;
	    this.logged = false;
    }
     
    createUser(callback) {
    	return ApiConnector.createUser({
	    username: this.username,
	    name: {firstName: this.firstName, lastName: this.lastName},
	    password: this.password
    },(err,data) => {
	    console.log(`Has been created user ${this.username}`);
	    callback(err,data);
	    });
    }
     
    addMoney({ currency, amount }, callback) {
	    return ApiConnector.addMoney({ currency, amount }, (err, data) => {
		    console.log(`Adding ${amount} of ${currency} to ${this.username}`);
		    callback(err, data);
	    });
    }
     
    performLogin(callback) {
	    return ApiConnector.performLogin({username: this.username, password: this.password}, (err,data) => {
		    console.log(`Login: ${this.username} password:${this.password}`);
		    callback(err, data);
	    });
    }
     
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
	    return ApiConnector.convertMoney({fromCurrency,targetCurrency,targetAmount}, (err,data) => {
		    console.log(data,err);
		    console.log(`Convert from ${fromCurrency} to ${targetCurrency}. Amount = ${targetAmount}`);
		    callback(err,data);
	    });
    }
     
    transferMoney({to,amount}, callback){
	    return ApiConnector.transferMoney({to,amount}, (err,data) => {
		    console.log(`Transfer ${amount} to ${to} from ${this.username}`);
		    callback(err,data);
	    });
    }
     
    getStocks(callback) {
	    return ApiConnector.getStocks((err,data)=>{
		    console.log(data);
		    console.log('GetStocks method is working');
		    callback(err,data);
	    });
    }
     
    currentCurrency(){
    	ApiConnector.getStocks
    }
};
     
     
function main(){
     
    const Petya = new Profile({
	    username: 'petya',
	    name: { firstName: 'Petr', lastName: 'Ivanov' },
	    password: 'petyaspass'
    });
     
    Petya.createUser((err,data) =>{
    	if (err){
	    	console.error('Error during creating user Petya')
	    }else{
	    	console.log(`User Petya has been created`);
	    	Petya.performLogin((err,data)=> {
	    		if (err) {
			    	console.error('Error during login user Petya')
			    }else{
			    	console.log(`User Petya has been logined`);
			    	Petya.logged = true
    		    }
    		});
    	}
    });

    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Petrov' },
        password: 'ivanspass'
	});
     
    
    Ivan.createUser((err,data) =>{
	    if (err) {
	    	console.error('Error during creating user Ivan')
	    }else{
		    console.log(`User Ivan has been created`);
		    Ivan.performLogin((err,data)=> {
			    if (err) {
			    	console.error('Error during login user Ivan');
			    } else {
			    	console.log(`User Ivan has been logined`);
			    	Ivan.logged = true
			    }
			});
		}
	});

	setTimeout (function() {moneyAdd (Ivan)}, 5000);
	setTimeout (function() {moneyTransf (Ivan, Petya)}, 6000);
}

 function moneyAdd (user1) {

	if (user1.logged) {
		user1.addMoney({ currency:'EUR', amount: 500000 }, (err, data) => {
		    if (err) {
		    	console.error(`Error during adding money to ${user1.username}`);
		    }else{
			    console.log(`Money has been added to ${user1.username}`);
			}
		});
	} else {
   		console.log(`${user1.username} not authorized`);
	} 
}

function moneyTransf (user1, user2) {
	user1.convertMoney({fromCurrency:'EUR',targetCurrency:'NETCOIN',targetAmount:36000}, (err,data) => {
		if (err) {
			console.error(`Error during convert money for ${user1.username}`)
		}else{
			console.log(`Money has been converted for ${user1.username}`);
			user1.transferMoney({to: user2.username,amount:36000},(err,data) => {
				(err) ? console.error(`Error during transfer money to ${user2.username}`) : console.log(`User ${user2.username} transfered money`);
			});
		}
	});
}

main();
