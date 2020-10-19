	// Variable declaration
	var endpointurl = 'https://apis.sentient.io/microservices/nlp/japanesener/v1/getpredictions';
	var callType = "AJAX";
	var contentType = "application/json";
	var inputjson = "";
	var companyList = '';
	var dateList = '';
	var domesticRegionList = '';
	var materialList = '';
	var nProductList = '';
	var provinceList = '';
	var s,t,w,x,y,z = '';
	
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
		var companyList = '';
		var dateList = '';
		var domesticRegionList = '';
		var materialList = '';
		var nProductList = '';
		var provinceList = '';
		var s,t,w,x,y,z = '';
		document.getElementById("responseDiv").style.display = "none";
		// Process
		var textinput = document.getElementById('textinput').value;
		// Remove special characters in the input text
		var inputjsonRemoveSpace = textinput.replace(/\s+/g, " ");
		var removesplchar = inputjsonRemoveSpace.replace(/[^a-zA-Z ]/g, "");
		var inputjson = '{"text": "'+inputjsonRemoveSpace+'"}';
		console.log(inputjson);
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
					var results = response;
					console.log(results);
					var company = results.Company;
					for (w in company) {
						var word=company[w].split(' ').join('');
						var toolid=word+"tooll";
						companyList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body' > <i class='fa fa-link' aria-hidden='true'></i> "+word+"</em>";
						document.getElementById("companyList").innerHTML = companyList;
					}
					var date = results.Date;
					for (x in date) {
						var word=date[x].split(' ').join('');
						var toolid=word+"toolo";
						dateList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+date[x]+"</em>";
						document.getElementById("dateList").innerHTML = dateList;
					}
					var domesticRegion = results.Museum;
					for (y in domesticRegion) {
						var word=domesticRegion[y].split(' ').join('');
						var toolid=word+"toolp";
						domesticRegionList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+domesticRegion[y]+"</em>";
						document.getElementById("domesticRegionList").innerHTML = domesticRegionList;
					}
					var material = results.Material;
					for (z in material) {
						var word=material[z].split(' ').join('');
						var toolid=word+"tools";
						materialList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+material[z]+"</em>";
						document.getElementById("materialList").innerHTML = materialList;
					}
					var nProduct = results.N_Product;
					for (s in nProduct) {
						var word=nProduct[s].split(' ').join('');
						var toolid=word+"tools";
						nProductList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+nProduct[s]+"</em>";
						document.getElementById("nProductList").innerHTML = nProductList;
					}
					var province = results.Province;
					for (t in province) {
						var word=province[t].split(' ').join('');
						var toolid=word+"tools";
						provinceList += "<em class='tag-gray' id='"+toolid+"' onclick='gotoNer(this)' data-toggle='popover'  data-container='body'><i class='fa fa-link' aria-hidden='true'></i> "+province[t]+"</em>";
						document.getElementById("provinceList").innerHTML = provinceList;
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
	// Process wikipedia
	var a=0;
	function gotoNer(e){
		if(a==0){
			a=1;
			$('.popover').css({"background-color":"#fff","color":"#424143"});
			$("#cardDiv").removeClass("card-popover1");
			$("#cardDiv").addClass("card-popover");
			var id = '#'+$(e).attr("id");
			var keyword=$(id).text();
			
			var isPopover = $(e).attr("data-original-title");
			$(id).css({"background-color":"#9a999b"});
			console.log(e);
			
				$(id).popover({
					html: true,
					placement: 'top',
					container: 'body',
					content: "<div class='card-popover'><div class='cell'> <div class='spinner spinner-org'></div></div><div class='rightDiv'><p>Looking for related Wikipedia articleâ€¦</p></div></div>",
				  }).popover('show');

			var templete="<div class='card-popover1'><div class='rightDiv'><p>Sorry, unable to find related Wikipedia articles on <b>"+keyword+"</b></p></div></div>";;	
			var result='N';
			// Calling wikipedia api
			$.ajax({
				method: 'POST',
				headers: { 'x-api-key': apikey },
				contentType: 'application/json',
				url: 'https://apis.sentient.io/microservices/utility/wikipedia/v0.1/getresults',
				data:JSON.stringify({"title":keyword,"filter_key":"all"}),
				timeout: 80000,
				success: function (response) {
					console.log(response);
					a=0;

					if(response.results !=undefined && response.results.summary!=undefined){
						
						var content=response.results.summary.substring(0,100)+"...";
						templete="<div class='card-popover'><div class='rightDiv'><h5><b>"+keyword+"</b></h5><p>"+content+"</p><a href='"+response.results.url+"' target='_blank'>Visit Link in Wikipedia</a></div></div>";
						
						if(response.results.images.length>0){
							templete="<div class='card-popover'><div class='leftDiv'><img class='flag' src='"+response.results.images[0]+"'></div><div class='rightDiv'><h5><b>"+keyword+"</b></h5><p>"+content+"</p><a href='"+response.results.url+"' target='_blank'>Visit Link in Wikipedia</a></div></div>";
						}
						result='S';
					}
					
					$(id).popover('destroy');
					
					setTimeout(function () {
						showPop(id,templete,result);
					},300);
				},
				error: function (err) {
					console.log(err);
					a=0;
					showPop(id,templete,result);
				}
				});
		}
	}
	// Clear Content
	function textClear(){
		location.reload();
	}
	
	//SHOW POPOVER BOX
	function showPop(id,templete,result){
		$(id).popover({
			html: true,
			placement: 'top',
			container: 'body',
			content: templete,
		}).popover('show');
		
		if(result=='N'){
			$('.popover').css({"background-color":"#9a999b","color":"white"});
		}
	}
	
	$('body').on('click', function (e) {
    $('[data-toggle=popover]').each(function () {
        // hide any open popovers when the anywhere else in the body is clicked
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});