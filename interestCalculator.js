function getRadioValue(name) {
	const radios = document.querySelectorAll("select.contribution_timing");
	for (let i = 0; i < radios.length; i++){
		if (radios[i].checked) {
			return radios[i].value;
		}
	}
	return null;
}




function getInputValue(id){
	const value = parseFloat(document.getElementById(id).value);
	return isNaN(value)?0 : value;
}

function clear(){
	document.getElementById("init_input").value = "";
	document.getElementById("annual_input").value = "";
	document.getElementById("monthl_input").value = "";
	document.getElementById("init_rate").value = "";
	document.getElementById("compound_times").value = "";
	document.getElementById("invest_length").value = "";
	document.getElementById("tax_rate").value = "";
	document.getElementById("inflation_rate").value = "";
	document.getElementById("contribution_timing").value = "";
}

function eval_uate(){
	const init_input = getInputValue("init_input");
	const annual_input = getInputValue("annual_input");
	const monthly_input = getInputValue("monthly_input");
	const int_rate = getInputValue("int_rate")/100;
	const compound = getInputValue("compound_times");
	const invest_length = getInputValue("invest_length");
	const tax_rate = getInputValue("tax_rate");
	const inflation_rate = getInputValue("inflation_rate");
	const contributionTiming = getRadioValue("contribution_timing");

	console.log("Initial input", init_input);
	console.log("Annual input", annual_input);
	console.log("Monthly input", monthly_input);
	console.log("Interest rate", int_rate);
	console.log("compound times", compound);
	console.log("Investment period", invest_length);
	console.log("tax rate", tax_rate);
	console.log("Inflation rate", inflation_rate);
	console.log("contribution timing", contributionTiming);
	

	const totalContribution = annual_input * invest_length
	const totalPrincipal = totalContribution + init_input
	const intInitialInvestment = (init_input * (Math.pow((1 + (int_rate / compound)), compound * invest_length)))-init_input;

	let contributionsAmount;
	if(contributionTiming=== "beginning"){
		//contribution at the beginning of every period
		intContributions = (annual_input * ((Math.pow((1 + int_rate / compound), compound * invest_length) - 1) / (int_rate / compound))*(1+ int_rate / compound))-totalContribution;
	} else {
		//contribution at the end of every period
		intContributions = (annual_input * ((Math.pow((1 + int_rate / compound), compound * invest_length) - 1) / (int_rate / compound)))-totalContribution;
	}
	//Total interest
	const total_interest = intInitialInvestment + intContributions;
	

	document.getElementById("total_contributions2").innerHTML = totalContribution;
	document.getElementById("principal2").innerHTML = totalPrincipal;
	document.getElementById("total_interest2").innerHTML = total_interest.toFixed(2);
	document.getElementById("init_investment2").innerHTML = intInitialInvestment.toFixed(2);
	document.getElementById("int_cont2").innerHTML = intContributions.toFixed(2);

}


