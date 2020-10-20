	// Variable declaration
	var endpointurl = 'https://apis.sentient.io/microservices/nlp/japanesener/v1/getpredictions';
	var callType = "AJAX";
	var contentType = "application/json";
	var inputjson = "";
	var ageList = '';
	var countx_otherList = '';
	var doctrine_method_otherList = '';
	var n_eventList = '';
	var numex_otherList = '';
	var ordinal_numberList = '';
	var personList = '';
	var product_otherList = '';
	var s,t,w,x,y,z,u,v,p = '';
	
	// Characters count method
	function contentCount(){
		var textinput = document.getElementById('textinput').value;
		document.getElementById('count').innerHTML = "<span class='reset'>Characters left: " + (textinput.length + " / 5000")+"</span>";
		document.getElementById('clearTxt').innerHTML = "<span class='reset'>Clear</span>";
		
		if(textinput.length >0){
			$('.reset').css({"color":"#424143"});
		}
		
		if (textinput.length >= 5001) {
			$("#confirmation-modal").modal();
			document.getElementById("errorTxt").innerHTML = "Content allow upto 5000 Characters. Please Try Again...";
			return false;
		}
	}
	
	function sendBtn(){
		var ageList = '';
		var countx_otherList = '';
		var doctrine_method_otherList = '';
		var n_eventList = '';
		var numex_otherList = '';
		var ordinal_numberList = '';
		var personList = '';
		var product_otherList = '';
		var s,t,w,x,y,z,u,v,p = '';
		document.getElementById("responseDiv").style.display = "none";
		// Process
		var textinput = document.getElementById('textinput').value;
		// Remove special characters in the input text
		var inputjsonRemoveSpace = textinput.replace(/\s+/g, " ");
		var removesplchar = inputjsonRemoveSpace.replace(/[^a-zA-Z ]/g, "");
		var inputjson = '{"text": "'+inputjsonRemoveSpace+'"}';
		if(textinput == undefined || textinput == null || textinput == ""){ 	
			document.getElementById("loader").style.display = "none";
			document.getElementById('text-error').style.display = 'block';
			return false;
		}
		document.getElementById('count').innerHTML = "Characters left: " + (textinput.length + " / 5000");
		if (textinput.length >= 5001) {
			$("#confirmation-modal").modal();
			document.getElementById("errorTxt").innerHTML = "Content allow upto 5000 Characters. Please Try Again...";
			return false;
		}
		else{
			document.getElementById("loader").style.display = "flex";
			document.getElementById('text-error').style.display = 'none';
	
			// Calling named entity recognition jap api
			$.ajax({
			method: 'POST',
			headers: { 'x-api-key': apikey },
			contentType: contentType,
			url: endpointurl,
			data:inputjson,
			timeout: 80000,
				success: function (response) {
					document.getElementById("loader").style.display = "none";
					document.getElementById("responseDiv").style.display = "block";
					// Response
					var age = response.results.age;
					for (w in age) {
						var word=age[w].split(' ').join('');
						var toolid=word+"toolw";
						ageList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body' > <i class='fa fa-link' aria-hidden='true'></i> "+word+"</em>";
						document.getElementById("ageList").innerHTML = ageList;
					}
					var countx_other = response.results.countx_other;
					for (x in countx_other) {
						var word=countx_other[x].split(' ').join('');
						var toolid=word+"toolx";
						countx_otherList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+countx_other[x]+"</em>";
						document.getElementById("countx_otherList").innerHTML = countx_otherList;
					}
					var doctrine_method_other = response.results.doctrine_method_other;
					for (y in doctrine_method_other) {
						var word=doctrine_method_other[y].split(' ').join('');
						var toolid=word+"tooly";
						doctrine_method_otherList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+doctrine_method_other[y]+"</em>";
						document.getElementById("doctrine_method_otherList").innerHTML = doctrine_method_otherList;
					}
					var n_event = response.results.n_event;
					for (z in n_event) {
						var word=n_event[z].split(' ').join('');
						var toolid=word+"toolz";
						n_eventList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+n_event[z]+"</em>";
						document.getElementById("n_eventList").innerHTML = n_eventList;
					}
					var numex_other = response.results.show_organization ;
					for (s in numex_other) {
						var word=numex_other[s].split(' ').join('');
						var toolid=word+"tools";
						numex_otherList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+numex_other[s]+"</em>";
						document.getElementById("numex_otherList").innerHTML = numex_otherList;
					}
					var ordinal_number = response.results.ordinal_number;
					for (t in ordinal_number) {
						var word=ordinal_number[t].split(' ').join('');
						var toolid=word+"toolt";
						ordinal_numberList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+ordinal_number[t]+"</em>";
						document.getElementById("ordinal_numberList").innerHTML = ordinal_numberList;
					}
					var person = response.results.person;
					for (u in person) {
						var word=person[u].split(' ').join('');
						var toolid=word+"toolu";
						personList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+person[u]+"</em>";
						document.getElementById("personList").innerHTML = personList;
					}
					var product_other = response.results.product_other;
					for (v in product_other) {
						var word=product_other[v].split(' ').join('');
						var toolid=word+"toolu";
						product_otherList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+product_other[v]+"</em>";
						document.getElementById("product_otherList").innerHTML = product_otherList;
					}
					var show_organization = response.results.show_organization;
					for (p in show_organization) {
						var word=show_organization[p].split(' ').join('');
						var toolid=word+"toolp";
						show_organizationList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+show_organization[p]+"</em>";
						document.getElementById("show_organizationList").innerHTML = show_organizationList;
					}
					
				},
				error: function (err) {
					console.log("err : " + err);
					document.getElementById("loader").style.display = "none";
					$("#confirmation-modal").modal();
					document.getElementById("errorTxt").innerHTML = "Please check your content and Try Again...";
					$('[data-toggle="popover"]').popover();
				}
				
				
			});
		}
	}

	// Clear Content
	function textClear(){
		location.reload();
	}
	
