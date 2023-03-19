var referencesList;
if($("#questionDetailsPage1").length > 0 || $("#sampleDetailsPage1").length > 0) {
/** Disable right-click of mouse, F12 key, and save key combinations on page **/
  window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
      // "C" key
      if (event.keyCode == 67) {
  	disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };
}
$(document).ready(function(){
	if($("#reviews").length > 0 || $("#mainSecondLevel").length > 0 || $('#reviewList').length) { 
                getReviewsBySubject();
	//jQuery(window).scroll(sticky_relocate),
		sticky_relocate();
        }
	setTimeout(function(){
		if(!getCookie('couponCodeCookie')) {
			var hasPermissionSetToLater = getCookie('couponCodeCookie');
			if(!hasPermissionSetToLater) {
				 $('.phone-code').each(function () {
                			$(this).attr('src', $(this).attr('data-src'));
       				 })
			//	$('#offerOnLoadModal').modal('show');
			}
		}
        }, 10000);
	$("#back-top").hide();
/*
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 50) {
	        $('#back-to-top').fadeIn();
	    } else {
	        $('#back-to-top').fadeOut();
	    }
	});
*/
// scroll body to 0px on click
	$('#back-to-top').click(function () {
	    $('body,html').animate({
	        scrollTop: 0
	    }, 800);
	    return false;
	});

	$('#dismiss, .overlay').on('click', function () {
    		$('#sidebar').removeClass('active');
    		$('.overlay').fadeOut();
	});

	$(window).scroll(function(){
  		var header = $('.header'),
      		scroll = $(window).scrollTop();
		if (scroll >= 80) header.addClass('header-fixed');
  		else header.removeClass('header-fixed');
	});
	$('body').scrollspy({target: ".navbar", offset: 50}); 
	$(".sidebar-tab-link-section ul li a").on('click', function(event) {
		if (this.hash !== "") {
      			event.preventDefault();
      			var hash = this.hash;
      			$('html, body').animate({scrollTop: $(hash).offset().top - 101}, 800, function(){});
    		}
  	});

	$(".tooltip1").popover();

	$('.aQy').hover(function () {
		$(this).parent().addClass('aZp');
	}, function () {
		$(this).parent().removeClass('aZp');
	})

	$('.aQv').hover(function () {
		$(this).addClass('T-I-JW');
	}, function () {
		$(this).removeClass('T-I-JW');
	})

	$('.aQw').hover(function () {
		$(this).parent().addClass('aZp');
	}, function () {
		$(this).parent().removeClass('aZp');
	})

	var subjects = new Bloodhound({
  		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: domainUrl+'/static/subjects_new.json',
			cache: false
		}
       });

	referencesList = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: domainUrl+'/static/references.json'
       });

	$('#references').typeahead({
                highlight: true,
                minLength: 0,
  		maxLength: 15
	},
        {
                name: 'references',
                source: referencesWithDefaults,
                display: 'value',
		limit: 15,
		templates: {
                        suggestion: function (data) {return '<div class="subsuc">'+data.value+'</div>'}
                }
        })

	$('.typeahead').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'subjects',
		source: subjects,
		display: 'value',
		limit:30,
		templates: {
    			suggestion: function (data) {return '<div class="subsuc">'+data.value+'<br/><small>'+data.parent+'</small></div>'}
  		}
	}).on('typeahead:selected', function(node, data) {
		$.ajax({
        		type: 'POST',
        		url: domainUrl+'/orders/showReport.php',
        		data: $.param({'subject':data.value}),
        		dataType: 'html',
        		success: function(data) {
				if(data) {
                			$('#pages').show();
					$('#reference').show();
				} else {
					$('#pages').hide();
					$('#reference').hide();
				}
                	},
        		async: true
    		});
	});
	if(supportAjaxUploadWithProgress()) {
		var fileConfig = {
                        fileId : 'files-upload3',
                        fileButtonId : 'uploadFiles3',
                        fileResultId : 'fileUpload3',
			fileUploadOrigin: 'orderForm'
                };
                configureProgressFile(fileConfig);
            if($('#fileUpload3').lenght){
            	var fileConfigDrag = {
                                 fileButtonId : 'dragdrop',
                                 fileResultId : 'fileUpload3',
                                 fileUploadOrigin: 'orderForm'
                         };
             	configureDragnDrop(fileConfigDrag);
            }
        }
        else {
                configureNormalFile();
	}
        $('.dec').click(function(){
        	var pgCnt = parseInt($('.pcmPage').val());
		pgCnt = pgCnt - 1;
		if(pgCnt<=0) {
			pgCnt = 1;
		}
		$('.pcmPage').val(pgCnt);
		$('.pcmPage1').val(pgCnt);
		$('.pcWordCountm').html(pgCnt*250);
		$('.pcWordCountm1').html(pgCnt*250);
        	findPrice();
        })

        $('.inc').click(function(){
        	var pgCnt = parseInt($('.pcmPage').val());
		pgCnt = pgCnt + 1;
		$('.pcmPage').val(pgCnt);
		$('.pcmPage1').val(pgCnt)
		$('.pcWordCountm').html(pgCnt*250);
		$('.pcWordCountm1').html(pgCnt*250);
        	findPrice();
        })

        $('.pcmPage').keyup(function(){
        	var pgCnt = parseInt($.trim($('.pcmPage').val()));
		if(pgCnt<=0) {
			pgCnt = 1;
		}
		else if(isNaN(pgCnt)) {
			pgCnt = 1;
		}
		$('.pcmPage').val(pgCnt)
		$('.pcWordCountm').html(pgCnt*250);
		$('.pcmPage1').val(pgCnt);
		$('.pcWordCountm1').html(pgCnt*250);
		findPrice();
        })
	
	$("#pageDec").click(function() {
    		var pgCnt = parseInt($("#page").val());
		pgCnt = pgCnt - 1;
                if(pgCnt<=0) {
                        pgCnt = 1;
                }
                $('#page').val(pgCnt);
	});

	$("#pageInc").click(function() {
		var pgCnt = parseInt($('#page').val());
                pgCnt = pgCnt + 1;
                $('#page').val(pgCnt);
	});

	$("#page").keyup(function() {
        	var pgCnt = parseInt($.trim($("#page").val()));
		if(pgCnt<=0) {
                        pgCnt = 1;
                }
                else if(isNaN(pgCnt)) {
                        pgCnt = 1;
                }
                $('#page').val(pgCnt)
	});
	
	if($('#wholeTutorList').length>0) {
		filterExpert(1);
	}
	if($('.AAHreviews').length>0) {
		filterReviews(1);
	}
	
	$('#responseMsg').addClass("hide");
	$('.login_div').click(function(){
		$('#loginErrorMsg').addClass('hide');
		$('.login-div, .loginWithOtp-div').addClass('hide');
		$('#confirmLoginOtpDiv').hide();
		$('.forgot-div').removeClass('hide');
	});

	$('.forgot_div').click(function(){
		$('.login-div').removeClass('hide');
		$('#confirmLoginOtpDiv').hide();
		$('.forgot-div, .loginWithOtp-div').addClass('hide');

	});
	$('.loginWithOtp').click(function (){
		$('.login-div,.forgot-div').addClass('hide');
                $('.loginWithOtp-div').removeClass('hide');
	
	});
	$(".f14 p a").hover(function() {
    		$(this).children("span").show()
	}, function() {
    		$(this).children("span").hide()
	});

	$('.panel-group').on('hidden.bs.collapse', toggleIcon);
	$('.panel-group').on('shown.bs.collapse', toggleIcon);

	$("#myNavbar a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){
	    			window.location.hash = hash;
	    		});
		}
	});
	
	$("#sidebarForm ,#sidebarForm1, #firstViewForm, #secondLabelFrom").submit(function(e){
		var formId = '';
		var form = $(this);
		var formIdChar = form.attr('id');
		if(formIdChar == 'sidebarForm1') {
			formId = 1;
		}else if(formIdChar == 'secondLabelFrom') {
                        formId = 2;
                }
		var submitButton = $('#'+formIdChar).find(':submit');
		submitButton.button({loadingText: 'Processing...'});
		submitButton.button('loading');

		var error1 = true;
		var error2 = !emailValidate('inputEmail'+formId, $("#inputEmail"+formId).val());
		var error3 = true;
		if($.trim($("#subject"+formId).val()) == ""){
			$("#subject"+formId).addClass('animated shake shake-error');
			setTimeout(function(){$("#subject"+formId).removeClass('animated shake');}, 1000);
		} else {
			$("#subject"+formId).removeClass('shake-error');
			error1=false;
		}
		if($("#deadlineDate"+formId).val() == "") {
			$("#deadlineDate"+formId).addClass('animated shake shake-error');
			setTimeout(function(){$("#deadlineDate"+formId).removeClass('animated shake');}, 1000);
		} else {
			$("#deadlineDate"+formId).removeClass('shake-error');
			error3=false;
		}
		$("#submitedFormId").val(formId);
		if($('#orderFormAttachmentModal').is(':visible')){
			var fileUploadCount = 0;
                        $('#fileUpload3 input[type=hidden]').each(function() {
                        if ($(this).val() != '') {
                                fileUploadCount++;
                        }
                        });
                        var requirement = $.trim($("#requirements").val());
			if(requirement == "" && fileUploadCount == 0){
				$("#requirementErrorMsg").show();
				$("#requirements").addClass('animated shake shake-error');
				$("#uploadFiles3").addClass('animated shake shake-error');
	                        setTimeout(function(){$("#requirements").removeClass('animated shake'); $("#uploadFiles3").removeClass('animated shake');}, 1000);
			}else if(requirement.length < 10 && fileUploadCount == 0){
				$("#requirementErrorMsg").show();
				$("#uploadFiles3").removeClass('shake-error');
        	        }else if(requirement.length > 10 || fileUploadCount!= 0){
				$("#requirementErrorMsg").hide();
                	        $("#requirements").removeClass('shake-error');
				$("#uploadFiles3").removeClass('shake-error');
				$("#requirements").addClass('inputSuccess');
				$("#uploadFiles3").addClass('inputSuccess');
				$('#requirementFileHtml'+formId).html($('#requirementSection').html());
				$("#requirements").val(requirement);
				$("#attachmentBtn").addClass('disabled');
			        $("#attachmentBtn").text('Processing..');
				return;
               		}
		}else{
			$("#requirements").val('');
		}
		if(error1 == true  || error2 == true  || error3 == true) {
				submitButton.button('reset');
				return false;
		} else {
			var bypassRequirement = $('#bypassRequirement'+formId).val();
			if(bypassRequirement == 0){
				$("#orderFormAttachmentModal").modal('show');
				submitButton.button('reset');
				return false;
			}else{
				return true
			}
		}
	});

	$("#firstOrderform").submit(function(e){
      		var error = emailValidate('firstOrderformEmail', $("#firstOrderformEmail").val());  
      		if(error != true){
            		e.preventDefault();
		}
	});

	var logic = function( currentDateTime ){
		if(currentDateTime.getDay()==3){
			this.setOptions({
				minTime:'15:00'
			});
		} else
			this.setOptions({
				minTime:'19:00'
			});
		};
		var date = new Date();
                date.setHours(date.getHours() + 4);
                $('.datetimeSelector1, .datetimeSelector, .datetimeSelector2').datetimepicker({
                weekStart: 1,
                todayBtn:  0,
                autoclose: 1,
                todayHighlight: 1,
                format: 'dd-M-yyyy HH:00 P',
                startView: 2,
                minView:1,
                forceParse: 0,
                startDate: date
                });

		$(".datetimeSelector1, .datetimeSelector, .datetimeSelector2").click(function(){
	            $(this).datetimepicker('show');
        	});
	/*
		if (typeof jQuery('.datetimeSelector, .datetimeSelector1').datetimepicker !== "undefined") {
			jQuery('.datetimeSelector, .datetimeSelector1').datetimepicker({
				minDate:0, 
				defaultTime:'11:30 PM',
				format:'d-M-Y h:i A',
       	      		  	 formatTime:'h:i A',
        	        	allowTimes:['12:00 AM', '12:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
			});
		}
		jQuery('.datetimeSelectorIcon').click(function(){
            jQuery('.datetimeSelector1').datetimepicker('show'); //support hide,show and destroy command
        });
	*/
	if($('#expertSubject').length || ($('#expertListData').length || $('#expertcarousel').length || $("#expertListDataAu").length)){
                getSubjectWiseExperts();
        }
	getCompleteQuestionsByExpert();

 	getLatestSampleList();      

	getSubjectWiseReviewsList(); 
	if(typeof countryCode !== 'undefined'){
        	$(".selectedPhoneCodeLi"+countryCode).click();
	}

	$(function(){
	$(".tollFreeContact li a").click(function(){

		$("#tollFreeContact").text($(this).text());
		$("#tollFreeContact").val($(this).text());
		$(".tollFreeContact li a").removeClass("contactActive");
		$(this).addClass("contactActive");
	});
	});
        
        $(".panel.panel-default a").each(function() {
    		$(this).click();//alert($(this).html());
		});

	$('#tableOfContentsdiv a[href^="#"]').on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 101
			}, 800, function(){

			});
		} // End if
	});
	if(!$('.full-width-banner').length && !$('.nav-white').length){
		$('.header').addClass('nav-black')
	}
	/*	
	if($('#secondLabelFrom').length){
		$('#sidebarForm input[name ="email"]').attr('tabindex', 4);	
		$('#sidebarForm input[name ="subject"]').attr('tabindex', 5); 
		$('#sidebarForm input[name ="deadline"]').attr('tabindex', 6); 
	}
	*/	
	if($('#secondLabelFrom').is(":visible")){
		$('#sidebarForm input[name ="email"], #sidebarForm input[name ="subject"], #sidebarForm input[name ="deadline"]').removeAttr('tabindex');	
	}else if($('#secondLabelFrom').length){
                $('#sidebarForm input[name ="email"]').attr('tabindex', 4);
                $('#sidebarForm input[name ="subject"]').attr('tabindex', 5);
                $('#sidebarForm input[name ="deadline"]').attr('tabindex', 6);
	}
	if(isMobile){
	$('.landing-writing-service-list h4').each(function (){
			$(this).click(
				function (){ 
					$(this).next('p').toggleClass('show hide');
				}
			);
			$(this).next('p').addClass('hide');
		}
	);
	}
});


function openNav() {
  $('#sidebar').addClass('active');
    $('.overlay').fadeIn();
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
};

$(window).scroll(function(){
	if ($(window).scrollTop()>300) {$('#omenu').addClass('omenuMove');}
        else {$('#omenu').removeClass('omenuMove');}
});

function showTab(id) {
	$('.nav-justified li').each(function () {
		$(this).removeClass('active');
	})
	$('.tab-pane').each(function() {
		$(this).removeClass('in active');
	})
	$('#'+id).addClass('in active');
	$('#'+id+'li').addClass('active');
}

function showPreview(fileUrl, fileName) {
	$('#fileHeading').html(fileName);
    	$('#showFileIframeModalBody').html('<iframe style="width: 100%;height: 500px;" src="https://docs.google.com/gview?url=' + fileUrl + '&embedded=true"></iframe>"');
    	//$('#dowlonadFileModal').attr('href', fileUrl);
   	//$('#dowlonadFileModal').attr('title', fileName);
    	$('#showFileIframeModal').modal();

	/*var a = $(document).height();
	var b = $(document).scrollTop();
	$('#orderForm').css('display','block');
	$('#orderForm').css('top',b+10+'px');
	$('#fade').css('display','block');
	$('#fade').css('height',a+'px');*/
}

function closeLb() {
	$('#orderForm').css('display','none');
	$('#payForm').css('display','none');
	$('#fade').css('display','none');
}

function showPrice(currency) {
	$(".priceTable").addClass("hide");
$("#" + currency).removeClass("hide");
$("html, body").animate({scrollTop: $(".price-details-row").offset().top}, 2e3);
return;
	$(".priceTable").addClass("hide");
	$('#'+id).show();
	$('html, body').animate({
		scrollTop: $("#tabs").offset().top
	}, 2000);
}

function showPrice(currency) {
	if($(".price-table-mb").is(":visible"))
	{
    		$(".price-table-mb").addClass("hide");
		$("#" + currency+"-mb").removeClass("hide");
		$("html, body").animate({scrollTop: $(".price-details-row").offset().top}, 2e3)
	}else{
		$(".priceTable").addClass("hide");
                $("#" + currency).removeClass("hide");
                $("html, body").animate({scrollTop: $(".price-details-row").offset().top}, 2e3)
	}
}
function showVideo() {
	var a = $(document).height();
	var b = $(document).scrollTop();
	$('#video').css('display','block');
	$('#video').css('top',b+100+'px');
	$('#fade').css('display','block');
	$('#fade').css('height',a+'px');
	$("#howItworks")[0].play();
}

function closeV() {
	$('#video').css('display','none');
	$('#fade').css('display','none');
	$("#howItworks")[0].pause();
}
function showTabHW(id) {
	$('.nav-tabs li').each(function() {
		$(this).removeClass('active');
	});
	$('.tab-content div').each(function() {
		$(this).removeClass('active').removeClass('in');
	});
	$(id).addClass('active').addClass('in');
	$(id+'-li').addClass('active')
}

function showContent() {
	$('#moreContentLink').hide();
	$('#moreContent').show();
}
function hideContent() {
	$('#moreContentLink').show();
	$('#moreContent').hide();
}

function findPrice() {
	$(".spinner").show();
	$(".priceWrapper-calculated").hide();
	var currency = $('.pcmCurrency').val().toUpperCase();
	var deadline = $('.pcmDeadline').val();
	var pageCount = parseInt($('.pcmPage').val());
	$.ajax({
        type: 'POST',
        url: domainUrl+'/calculatePrice',
        data: $.param({'currency':currency, 'deadline':deadline, 'pageCount':pageCount}),
        dataType: 'html',
        success: function(data) {
		var competetorTotalPricem = parseInt(data*0.6);
                $('.totalPricem').html(data+' '+currency);
		$(".competetorTotalPricem").html(competetorTotalPricem+' '+currency);
		$(".spinner").hide();
		$(".priceWrapper-calculated").show()
		},
        async: true
    });

}

function findPrice1() {
        $(".spinner").show();
        $(".priceWrapper-calculated").hide();
        var currency = $('.pcmCurrency1').val().toUpperCase();
        var deadline = $('.pcmDeadline1').val();
        var pageCount = parseInt($('.pcmPage1').val());
        $.ajax({
        type: 'POST',
        url: domainUrl+'/calculatePrice',
        data: $.param({'currency':currency, 'deadline':deadline, 'pageCount':pageCount}),
        dataType: 'html',
        success: function(data) {
                var competetorTotalPricem = parseInt(data*0.6);
                $('.totalPricem').html(data+' '+currency);
                $(".competetorTotalPricem").html(competetorTotalPricem+' '+currency);
                $(".spinner").hide();
                $(".priceWrapper-calculated").show()
                },
        async: true
    });

}

function emailValidate(id,email) {
	if(!validateEmail(email)) {
		$("#"+id).addClass('shake-error');
		$("#"+id).addClass('animated shake');
		$("#"+id).addClass('shake-error');
		setTimeout(function(){$("#"+id).removeClass('animated shake');}, 1000);
		return false; 
	}
	else {
		$("#"+id).removeClass('shake-error');
		return true; 
	}
}

function sendForgotPasswordEmail() {
	var email = $.trim($("#frgtPass").val());
	if(emailValidate('frgtPass', email)) {
		$('#resetPassword').prop("disabled", true);
		$('.changePaaswordText').text("Processing ");
		$('.changePaaswordText').append("<i class='fa fa-sign-in'></i>");
		$.ajax({
			type: "POST",
			url: domainUrl+"/orders/sendFrgtPassword.php",
			data: $.param({email: email}),
			dataType: "html",
			success: function(status) {
				$("#responseMsg").removeClass('hide');
				if(status == 'success'){
					$("#responseMsg").text("We just sent you an email with your password. The e-mail should show up within few seconds. If it doesn't, check your spam.");   
					if($("#responseMsg").hasClass("alert-danger")) {
						$("#responseMsg").removeClass("alert-danger");
					}
					$("#responseMsg").addClass("alert-success");
				} else {
                                        $("#responseMsg").text("It seems like you have entered a wrong/invalid email id. Please enter a correct one.");
					if($("#responseMsg").hasClass("alert-success")) {
						$("#responseMsg").addClass("alert-success");
					}
                                        $("#responseMsg").addClass("alert-danger");
				}
				$('#resetPassword').prop("disabled", false);
                                $('.changePaaswordText').text("Reset Password ");
                                $('.changePaaswordText').append("<i class='fa fa-sign-in'></i>");
			},
			async: true
		});
	}
	return false;
}

function doLoginCheck() {
	var error=true;
	var email = $.trim($("#email").val());
	var error = !emailValidate('email', email);
	if($("#password").val() == "") {
		$("#password").addClass('shake-error');
		$("#password").addClass('animated shake');
		$("#password").addClass('shake-error');
		setTimeout(function(){$("#password").removeClass('animated shake');}, 1000);
		error=true; 
	}
	else {
		$("#password").removeClass('shake-error');        
	}
	if(error) {
		return false;
	} else {
		return true;
	}
}

function referencesWithDefaults(q, sync) {
  if (q === '') {
    sync(referencesList.all().slice(0, 15));
  } else {
    referencesList.search(q, sync);
  }
}

function subjectFilter(subjectId, subjectHeading){
        $('#subjectValue').val(subjectId);
        $('#subjectHead').html(subjectHeading);
        filterExpert(1);
}

function filterExpert(pageNo) {
		$('#mainSubject, #expertsRating, #expertsCountry').hide();
		$('.spinner').show();
		$('#wholeTutorList').hide();
                var countryValue = $('#countryValue').val();
                var ratingValue = $('#ratingValue').val();
                var subjectValue = $('#subjectValue').val();
                $.ajax({
                type: 'POST',
                url: domainUrl+'/experts/tutorData.php',
                data: $.param({'subjectId':subjectValue, 'countryValue':countryValue, 'ratingValue':ratingValue, 'pageNo':pageNo}),
                dataType: 'json',
                success: function(data) {
                        $('#wholeTutorList').html(data.summary).show();
			$('.spinner').hide();
			if($('.tutor-pagination .first').length) {
				$('.tutor-pagination').twbsPagination('destroy');
			}
			var totalPages = data.totalPages;
			var visiblePages = data.visiblePages;
                        if(totalPages=='0') {totalPages = '1'}
                        $('.tutor-pagination').twbsPagination({
                                startPage: pageNo,
                                totalPages: totalPages,
                                visiblePages: visiblePages,
                                onPageClick: function (event, page) {
                                        filterExpert(page);
                                }
                        });
                },
                async: true
                });
}


function ratingFilter(ratingValueNew){
        $('#ratingValue').val(ratingValueNew);
        $('#ratingHead').html(ratingValueNew);
        filterExpert(1);
}

function countryFilter(countryID, countryHeading){
        $('#countryValue').val(countryID);
        $('#countryHead').html(countryHeading);
        filterExpert(1);
}

function filterReviews(pageNo) {
	$('#reviewList').animate({scrollTop: 0}, 2000);
	$('.spinner').show();
                $('#reviewList').hide();
                var ratingValue = $('#ratingValue').val();
                $.ajax({
                type: 'POST',
                url: domainUrl+'/experts/reviewData.php',
                data: $.param({'ratingValue':ratingValue, 'pageNo':pageNo}),
                dataType: 'json',
                success: function(data) {
                        $('#reviewList').html(data.summary).show();
                        $('.spinner').hide();
                        if($('.review-pagination .first').length) {
                                $('.review-pagination').twbsPagination('destroy');
                        }
                        var totalPages = data.totalPages;
                        var visiblePages = data.visiblePages;
                        if(totalPages=='0') {totalPages = '1'}
                        $('.review-pagination').twbsPagination({
                                startPage: pageNo,
                                totalPages: totalPages,
                                visiblePages: visiblePages,
                                onPageClick: function (event, page) {
                                        filterReviews(page);
                                }
                        });
                },
                async: true
                });
}

function submitSubscriber(){
	var email = $.trim($("#subscriberEmail").val());
	var source = $.trim($("#subscriberSource").val());
	$('#subscriberSubmitBtn').button({loadingText: 'Processing...'});
	if ("" == email || !validateEmail(email) || "" == source) return ($("#subscriberEmail").addClass('animated shake'),$("#subscriberEmail").addClass('shake-error'), setTimeout(function(){$("#subscriberEmail").removeClass('animated shake');}, 1000)), !1;
 	$('#subscriberSubmitBtn').button({loadingText: 'Processing...'});
        $('#subscriberSubmitBtn').button('loading');
	$("#subscriberEmail").removeClass("subscriberEmailErr");
	$.ajax({
        type: "POST",
        url: domainUrl+"/subscriber.php",
        data: $.param({
            email: email,
            source :source
        }),
        dataType: "html",
        success: function(email) {
			if(email){
				$("#footerform").hide(), $(".ftr-subscribe").append("<div class='alert alert-success'><i class='fa fa-check'></i> You have successfully subscribed for special offers.</div>");
			}else{
				($("#subscriberEmail").addClass('animated shake'),$("#subscriberEmail").addClass('shake-error'), setTimeout(function(){$("#subscriberEmail").removeClass('animated shake');}, 1000)),$('#subscriberSubmitBtn').button('loading');
			}
	},
        async: !0
    });
}

function validatePlagiarismForm() {
	var error=error1=error2=error3=true;
	var plagiarismEmail = $("#plagiarismEmail"),
        plagiarismDeadlineTime = $("#plagiarismDeadlineTime"),
        plagiarismPhone = $("#plagiarismPhone"),
        plagiarismEmailValue = $.trim(plagiarismEmail.val()),
        plagiarismDeadlineTimeValue = $.trim(plagiarismDeadlineTime.val()),
        plagiarismPhoneValue = $.trim(plagiarismPhone.val());
	var count = 0;
	if ("" == plagiarismEmailValue || !validateEmail(plagiarismEmailValue) || plagiarismEmailValue.length > 100 ){
		plagiarismEmail.removeClass('inputSuccess');
		plagiarismEmail.addClass('animated shake');
		plagiarismEmail.addClass('shake-error');
		setTimeout(function(){
    			plagiarismEmail.removeClass('animated shake');}, 1000);
		plagiarismEmail.focus();           	 
		error = true;
        }
    	else {
        	plagiarismEmail.removeClass('shake-error');
		plagiarismEmail.addClass('inputSuccess');
		error=false;
 	}
	if("" == plagiarismDeadlineTimeValue ) {
		plagiarismDeadlineTime.addClass('animated shake');
                plagiarismDeadlineTime.addClass('shake-error');
                setTimeout(function(){
                        plagiarismDeadlineTime.removeClass('animated shake');}, 1000); 
		plagiarismDeadlineTime.removeClass('inputSuccess');
		if(!error) {
			plagiarismDeadlineTime.focus();	
		}
		error1=true;
        }
    	else {
         	 plagiarismDeadlineTime.removeClass('shake-error');
		 plagiarismDeadlineTime.addClass('inputSuccess');                 
		 error1 = false;
   	 }
   	 if(plagiarismPhoneValue.length < 6 || plagiarismPhoneValue.length > 13){
		plagiarismPhone.addClass('animated shake');
                plagiarismPhone.addClass('shake-error');
                setTimeout(function(){
                        plagiarismPhone.removeClass('animated shake');}, 1000);
		 
		plagiarismPhone.removeClass('inputSuccess');
		if(!error && !error1) {
			plagiarismPhone.focus();
		}
        	 error2 = true;
        }
    	else {
                plagiarismPhone.removeClass('shake-error');
		plagiarismPhone.addClass('inputSuccess');
 	        error2 = false;
   	 }	
	$("#fileUpload3 input[type=hidden]").each(function() {
		if($(this).val()!="") {
			count++;
		}
	});  
	if(count==0){
		$("#fileUploadType").addClass('animated shake');
                $("#fileUploadType").addClass('shake-error');
                setTimeout(function(){$("#fileUploadType").removeClass('animated shake');}, 1000);
		$("#extraMsg").css('color','white');
		$("#extraMsg").html('Please upload atleast one  file.');
		error3 = true;
	} else{
		$("#extraMsg").html('');
		$("#fileUploadType").removeClass('shake-error');                
		error3 = false;
	}
	if(error || error1 || error2 || error3){
		$("#plagiarismBtn").prop("disabled", false);
	        return false;
    	} else {
		$("#plagiarismBtn").prop("disabled", true);
		return true;
    	}	
}

function initialiseChosen() {
      $('.chosen-container').remove();
      $('.chosen-select').chosen({max_selected_options: 200});
}




function toggleIcon(e) {
	$(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('fa-plus fa-minus');
}

function validateAffiliateForm(formNo,no){
    $("#affiliateBtn"+no).prop("disabled", 1);
    var name = $("#name"+no).val();
    var email = $("#email"+no).val();
    var phone = $("#phone"+no).val();
    var error=false;
        if("" == name ) {
                $("#name"+no).addClass('animated shake');
                $("#name"+no).addClass('shake-error');
                setTimeout(function(){
                        $("#name"+no).removeClass('animated shake');}, 1000);
                $("#name"+no).removeClass('inputSuccess');
                $("#name"+no).focus();
                error1=true;

        }
        else {
                 $("#name"+no).removeClass('shake-error');
                 $("#name"+no).addClass('inputSuccess');
                 error1=false;

         }


        if ("" == email || !validateEmail(email) || email.length > 100 ){
                $("#email"+no).removeClass('inputSuccess');
                $("#email"+no).addClass('animated shake');
                $("#email"+no).addClass('shake-error');
                setTimeout(function(){
                        $("#email"+no).removeClass('animated shake');}, 1000);
                $("#email"+no).focus();
                error2=true;
        }
        else {
                $("#email"+no).removeClass('shake-error');
                $("#email"+no).addClass('inputSuccess');
                error2=false;

        }
if("" == phone || (phone.length < 9 || phone.length > 13)) {
                $("#phone"+no).addClass('animated shake');
                $("#phone"+no).addClass('shake-error');
                setTimeout(function(){
                        $("#phone"+no).removeClass('animated shake');}, 1000);
                $("#phone"+no).removeClass('inputSuccess');
                $("#phone"+no).focus();
                error3=true;

        }
        else {
                $("#phone"+no).removeClass('shake-error');
                $("#phone"+no).addClass('inputSuccess');
                error3=false;

         }
if(error1 || error2 || error3 ){

                $("#affiliateBtn"+no).prop("disabled", 0);
                return false;
        }
        else
        {
                $("#affiliateBtn"+no).html('Processing..');
                $("#affiliateBtn"+no).prop("disabled", 0)
                $("#affiliateForm"+no).submit();
                return true;

 }
}

function affiliateEarning(){
$(".spinner").show();
$(".priceWrapper-calculated").hide();
var averageValueofAssignment = $("#averageValueofAssignment").val();
var numberOfAssignments = $("#numberOfAssignments").val();
var assignmentValue = $("#assignmentValue").val();
var commission = parseInt($("#commission").val());
var pageCount = parseInt($(".pageCount").val());
var currency = $("#currencyCode").val();
if(numberOfAssignments <= 100){
        commission = 10;
}
else if(numberOfAssignments > 100 && numberOfAssignments <= 150){
        commission = 12;
}

else if(numberOfAssignments > 150){
        commission = 15;
}
var totalAssignmentValue=numberOfAssignments*averageValueofAssignment;
         if(totalAssignmentValue){
                 $("#assignmentValue").attr('value', totalAssignmentValue + " " + currency);
                 var commissionvalue=(commission/100)*totalAssignmentValue;
                 commissionvalue = commissionvalue.toFixed(2);
                 $("#earning").html(commissionvalue);
                 $("#commission").attr('value', commission+'%');
                 setTimeout(function() {
                             $(".spinner").hide();
                             $(".priceWrapper-calculated").show();


                            }, 500);

         }

 }
$(".price-calc-form-wrapper .decPage").click(function() {
         var e = parseInt($(".pageCount").val());
         (e -= 1) <= 0 && (e = 1), $(".pageCount").val(e), $(".pcWordCountm").html(70 * e), affiliateEarning()
     }), $(".price-calc-form-wrapper .incPage").click(function() {
         var e = parseInt($(".pageCount").val());
         e += 1, $(".pageCount").val(e), $(".pcWordCountm").html(70 * e), affiliateEarning()
     }), $(".pageCount").keyup(function() {
 var e = parseInt($.trim($(".pageCount").val()));
         e <= 0 ? e = 1 : isNaN(e) && (e = 1), $(".pageCount").val(e), $(".pcWordCountm").html(70 * e), affiliateEarning()
     });

function becameAffiliate(){
$("#name2").focus();

}

function backToTop(){
$("#name1").focus();

            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;


}
function ratingStar(a)
{
  $("#sendReview .modal-content .form-group .star-border .fa").css("color","#e3e3e3");
  $("#star-borders").addClass("star-border");
for(i=1; i<=a; i++)
{

 $("#star"+i).css("color","red");
}

$("#ratingBox").val(a);
}
$("#sendReview").submit(function(e){

 
	 var error1 = true;
         var error2 = true;
       	 var error3 = true;
 	var error4 = true;
	var error5 = true;
		
 
     if($.trim($("#orderId").val()) == "" ||  $("#orderId").val().length < 15) 
         {
             $("#orderId").addClass('shake-error');
             $("#orderId").addClass('animated shake');
             $("#orderId").addClass('shake-error');
             setTimeout(function(){
             $("#orderId").removeClass('animated shake');}, 1000);
             error1=false; 
         }
     else
         {
    
         $("#orderId").removeClass('shake-error');        
         }


     if($.trim($("#name").val()) == "")
         {
             $("#name").addClass('shake-error');
             $("#name").addClass('animated shake');
             $("#name").addClass('shake-error');
             setTimeout(function(){
             $("#name").removeClass('animated shake');}, 1000);
             error2=false; 
         }
     else
         {
    
         $("#name").removeClass('shake-error');        
         }

    if($.trim($("#reviewTitle").val()) == "")
         {
             $("#reviewTitle").addClass('shake-error');
             $("#reviewTitle").addClass('animated shake');
             $("#reviewTitle").addClass('shake-error');
             setTimeout(function(){
             $("#reviewTitle").removeClass('animated shake');}, 1000);
             error3=false; 
         }
     else
         {
    
         $("#reviewTitle").removeClass('shake-error');        
         }


     if($.trim($("#reviewComment").val()) == "")
         {
             $("#reviewComment").addClass('shake-error');
             $("#reviewComment").addClass('animated shake');
             $("#reviewComment").addClass('shake-error');
             setTimeout(function(){
             $("#reviewComment").removeClass('animated shake');}, 1000);
             error4=false; 
         }
     else
         {
    
         $("#reviewComment").removeClass('shake-error');        
         }
  
    if($.trim($("#ratingBox").val()) == "")
         {
             $(".star-border").addClass('shake-error');
             $(".star-border").addClass('animated shake');
             $(".star-border").addClass('shake-error');
             setTimeout(function(){
             $(".star-border").removeClass('animated shake');}, 1000);
             error5=false; 
         }
     else
         {
    
         $(".star-border").removeClass('shake-error');        
         }



     if(error1 == true && error2 == true && error3 == true && error4 == true && error5 == true)
        {
 		
	    $('#add-review-modal').modal('hide');
            $.smkAlert({text:"Thanks for submitting the review. It is under moderation, will be published once approved.", type:'success'}); 
            return false;
            $("orderId").val("");
            $("name").val("");
	    $("reviewTitle").val("");
	    $("reviewComment").val("");
            $("ratingBox").val("");

	}
     else
        {
         
	     e.preventDefault();
        }
});
if(typeof filledSubject !== 'undefined'	){
	if(filledSubject !=''){
		$.ajax({
			type: "POST",
			url: "orders/showReport.php",
			data: $.param({
			subject: filledSubject
			}),
			dataType: "html",
			success: function(e) {
			e ? ($("#pages").show(), $("#reference").show()) : ($("#pages").hide(), $("#reference").hide())
		},
		async: !0
		});
	}
}

function applyCallbackRequest(e) { 
    var a = new RegExp(/^([\d]{8,12})?$/),
        r = $.trim($("#callBackContact").val()),
        o = $.trim($("#dateCallback").val()),
        i = $("input:checkbox[name=callbackAnytime]:checked").val(),
        n = $.trim($("#reasonCallback").val());
	var  arrDateTime = o.split(" ");
    var error = false;	
	if(r == ''){
		$("#callBackContactErr").html("Please enter valid contact number");
		error = true;
	}else{
		$("#callBackContactErr").html("");
                error = false;
	}
  	if ($('input:checkbox[name=callbackAnytime]').is(':checked')){
                $("#dateCallbackErr").html("");
                error = false;
        }else if(o == ''){
                $("#dateCallbackErr").html("Please enter valid date");
                error = true;
        }else{
                $("#dateCallbackErr").html("");
                error = false;
        }

	var s = arrDateTime['1'];
  if (!error) {
  $("#submitCallbackRequest").button("loading");
    $.ajax({
        type: "POST",
        url: domainUrl + "/dashboard/callbackUser.php",
        data: $.param({
            customerId: e,
            callBackContact: r,
            dateCallback: o,
            timeCallback: s,
            callbackAnytime: i,
            reasonCallback: n
        }),
        dataType: "json",
        success: function(e) {
            $("#submitCallbackRequest").button("reset"), $.smkAlert({
                text: e.msg,
                type: e.status
            }), $("#callback-request-modal").modal("hide")
        },
        async: !0
    });
  }
}

function addAssignmentFeedbackData(){
	 var error=error1=error2=error3=error4=error5=true;
         var feedbackAssignmentId = $("#feedbackAssignmentId").val();
	 var adminId = $("#adminId").val();
	 var assignmentFeedbackId = $("#assignmentFeedbackId").val();
  	 var userRespond = $("#userRespond").val();
         var tutorScore = $("#tutorScore").val();
         var supportScore = $("#supportScore").val();
         var assignmentScore = $("#assignmentScore").val();
         var feedbackComment = $("#feedbackComment").val();
         var nextFeedbackDate = $("#nextFeedbackDate").val();
	 if("" == userRespond) {
                $("#userRespond").addClass('animated shake');
                $("#userRespond").addClass('shake-error');
                setTimeout(function(){
                        $("#userRespond").removeClass('animated shake');}, 1000);
                $("#userRespond").removeClass('inputSuccess');
                $("#userRespond").focus();
                error=true;
         }else {
                 $("#userRespond").removeClass('shake-error');
                 $("#userRespond").addClass('inputSuccess');
                 error=false;
         }
	 if(userRespond == "resultAwaited" && "" == nextFeedbackDate) {
                $("#nextFeedbackDate").addClass('animated shake');
                $("#nextFeedbackDate").addClass('shake-error');
                setTimeout(function(){
                        $("#nextFeedbackDate").removeClass('animated shake');}, 1000);
                $("#nextFeedbackDate").removeClass('inputSuccess');
		if(!error) {
                	$("#nextFeedbackDate").focus();
		}	
                error1=true;
         }else {
                 $("#nextFeedbackDate").removeClass('shake-error');
                 $("#nextFeedbackDate").addClass('inputSuccess');
                 error1=false;
         }
	 if(userRespond == "responseReceived" && "" == tutorScore) {
                $("#tutorScore").addClass('animated shake');
                $("#tutorScore").addClass('shake-error');
                setTimeout(function(){
                        $("#tutorScore").removeClass('animated shake');}, 1000);
                $("#tutorScore").removeClass('inputSuccess');
		if(!error && !error1) {
	                $("#tutorScore").focus();
		}
                error2=true;

         }else {
                 $("#tutorScore").removeClass('shake-error');
                 $("#tutorScore").addClass('inputSuccess');
                 error2=false;
         }
	 if(userRespond == "responseReceived" && "" == supportScore) {
                $("#supportScore").addClass('animated shake');
                $("#supportScore").addClass('shake-error');
                setTimeout(function(){
                        $("#supportScore").removeClass('animated shake');}, 1000);
                $("#supportScore").removeClass('inputSuccess');
		if(!error && !error1 && !error2) {
            	  	 $("#supportScore").focus();
		}
                error3=true;
         }else {   
                 $("#supportScore").removeClass('shake-error');
                 $("#supportScore").addClass('inputSuccess');
                 error3=false;
         }
	 if(userRespond == "responseReceived" && "" == assignmentScore) {
                $("#assignmentScore").addClass('animated shake');
                $("#assignmentScore").addClass('shake-error');
                setTimeout(function(){
                        $("#assignmentScore").removeClass('animated shake');}, 1000);
                $("#assignmentScore").removeClass('inputSuccess');
		if(!error && !error1 && !error2 && !error3) {
              		 $("#assignmentScore").focus();
		}
                error4=true;
         } else {   
                 $("#assignmentScore").removeClass('shake-error');
                 $("#assignmentScore").addClass('inputSuccess');
                 error4=false;
         } 
 	 if("" == feedbackComment) {
                $("#feedbackComment").addClass('animated shake');
                $("#feedbackComment").addClass('shake-error');
                setTimeout(function(){
                        $("#feedbackComment").removeClass('animated shake');}, 1000);
                $("#feedbackComment").removeClass('inputSuccess');
		if(!error && !error1 && !error2 && !error3 && !error4) {
                	$("#feedbackComment").focus();
		}
                error5=true;
         }else {
                 $("#feedbackComment").removeClass('shake-error');
                 $("#feedbackComment").addClass('inputSuccess');
                 error5=false;
         }
	 if (error || error1 || error2 || error3 || error4 || error5) {
        	return false;
   	 } else {

                 $("#feedbackFormBtn").button('loading');
                 $.ajax({
                        type:'POST',
                        url:domainUrl+'/orders/addAssignmentFeedback.php',
                        data: $.param({
                        'feedbackAssignmentId':feedbackAssignmentId,
			'adminId':adminId,
			'assignmentFeedbackId':assignmentFeedbackId,
                        'tutorScore':tutorScore,
                        'supportScore':supportScore,
                        'assignmentScore':assignmentScore,
                        'response':userRespond,
                        'feedbackComment':feedbackComment,
			'nextFeedbackDate':nextFeedbackDate
                        }),
                        dataType:'html',
                        success:function(data) {
                        $("#feedbackFormBtn").button('reset');
			if(data == 'success') {
				   $("#feedbackSubmitContainer").hide();
				   $("#feedbackReceivedContainer").show();
			}				
                       },
                        async:true
                });


        }

}

function changeUserRespondContent(){
        var userRespondString = $("#userRespond").val();
	if(userRespondString!= "responseReceived"){
                $("#tutorScoreDiv, #supportScoreDiv").hide();
                $("#feedbackRequest").show();
        }
        else{
                $("#tutorScoreDiv, #supportScoreDiv").show();
                $("#feedbackRequest").hide();


        }
}

function requestQuestionBankSolution(questionBankId, assignmentId, solutionType, button) {
	var email = $("input[name=e]").val();
	var id = $("input[name=o]").val();
	var descountedPrice = $("input[name=a]").val();
	var currency = $("input[name=c]").val();
	var title = $("input[name=t]").val();
	var checkFakeUserbv451 = $("input[name=checkFakeUserbv451]").val();
	var emailValidate = true;
	if(email.trim() == '' || !validateEmail(email) || email.length > 100) {
		$("input[name=e").removeClass('inputSuccess');
                $("input[name=e").addClass('animated shake');
                $("input[name=e").addClass('shake-error');
                setTimeout(function(){
                        $("input[name=e").removeClass('animated shake');}, 1000);
                $("input[name=e").focus();
		return false;
	}
	if(questionBankId != '' && id != '' && descountedPrice != '' && currency != '' && title != '') {
		$("#"+button).removeClass('implSbmt');
		$("#"+button).button('loading');
		$(".implSbmt").prop('disabled', true);
		$.ajax({
			type:"post",
			url:domainUrl+"/questions/addUserQuestionBank.php",
			data:$.param({'customerId':customerId,'email':email,'checkFakeUserbv451':checkFakeUserbv451,'assignmentId':assignmentId,'solutionType':solutionType,'descountedPrice':descountedPrice,'currency':currency,'questionBankOrderId':id}),
			dataType:'json',
			success:function(data) {
				if(data.responseMsg.msg == 'success') {
					window.location.assign(questionBankUrl+'/makepayment.php?a='+descountedPrice+'&c='+currency+'&o='+id+'&e='+email+'&t='+title+'&aid='+data.responseMsg.assignmentId+'&stype='+solutionType+'&userId='+data.responseMsg.userId);
				} else if(data.responseMsg == 'error') {
					alert('Some error just occured. Please try again');
				} else if(data.responseMsg == 'authFail') {
					alert('Authentication Failure. Please Contact Admin');
				}
				$("#"+button).addClass('implSbmt');
				$("#"+button).button('reset');
                                $(".implSbmt").prop('disabled', false);
			}
		});
	} else {
		alert("Your request can not be completed at the moment please try after some time");
	}
}

function getReviewsBySubject() { 
	var subjectId = $("#subjectId").text().trim();
	$.ajax({
		type:'post',
		url:domainUrl+'/samples/getReviewsBySubject.php',
		data:$.param({'subjectId':subjectId}),
		dataType:'json',
		success:function(data) { console.log(data);
			$("#reviews").html(data.reviews);
			$("#placeOrderStripe").html(data.orderStripe);
		},
		async:true
	});
}	
function sliderForm(){
 var $widget = $('.bannerwidget');
    if (!$widget.hasClass('widget--enter')) {
      if ($widget.hasClass('widget--leave')) {
        $widget.removeClass('widget--leave');
      }
      $widget.addClass('widget--enter');
    } else if ( !$widget.hasClass('widget--leave')) {
      $widget.removeClass('widget--enter');
      $widget.addClass('widget--leave');
    }
}
$(window).on('scroll', function () {
	var $widget = $('.bannerwidget');
	var pos = $(window).scrollTop();
	// is device desktop
	if (window.innerWidth >= 1080) {
	// is hero in viewport
	if (pos <= 50 && !$widget.hasClass('widget--enter')) {
	if ($widget.hasClass('widget--leave')) {
		$widget.removeClass('widget--leave');
	}
	$widget.addClass('widget--enter');
	} else if (pos > 50 && !$widget.hasClass('widget--leave')) {
	$widget.removeClass('widget--enter');
	$widget.addClass('widget--leave');
	}
	}
});


function getSubjectWiseExperts() {
        var subjectName = $.trim($('#expertSubject').val());
	var pageURL = $(location).attr("href");
                $('.spinner').show();
                $('#expertcarousel').hide();
                $.ajax({
                type: 'POST',
                url: domainUrl+'/experts/getSubjectWiseExperts.php',
                data: $.param({'subjectName':subjectName, 'pageURL':pageURL}),
                dataType: 'json',
                success: function(data) {
                        if(data.status == 'success'){
                                $('#expertcarousel').html(data.summary);
				$('#expertListData').html(data.summaryList);
				$('#expertListDataAu').html(data.summaryListAu);
                        }
                        $('.spinner').hide();
                        $('#expertcarousel').show();
                },
                async: true
                });
}

function sticky_relocate() {
	
    if($(".rightsidebar").hasClass('mobilesideBar')){
	return;
    }
/*
    var window_top = jQuery(window).scrollTop();
    if($('#main-footer').length){
    	var footer_top = jQuery("#main-footer").offset().top;
     }else{
	var footer_top = 0;
    }
    var div_top = jQuery('#before-sticky-sidebar').offset().top + jQuery('#before-sticky-sidebar').height()+$("#sidebarBoostArea").height()+$("#mostViewed").height()+100;
    var sampleListData = $("#sampleListData").height()+jQuery('#before-sticky-sidebar').offset().top + jQuery('#before-sticky-sidebar').height();
    var div_height = jQuery("#sticky-sidebar").height();
    if($("#mainSecondLevel").length) { 
	
	//$("#sidebarBoostArea,#mostViewed").hide(); 
	}
    var padding = 20;  
 
    if (window_top + div_height > footer_top - padding) {
        jQuery('#sticky-sidebar').css({top: (window_top + div_height - footer_top + padding) * -1});
    }
    else if (window_top > div_top && sampleListData >div_top) {
        jQuery('#sticky-sidebar').addClass('stick');
        jQuery('#sticky-sidebar').css({top: 80});
    } else {
        jQuery('#sticky-sidebar').removeClass('stick');
    }
	*/
    var $sticky = $('#sticky-sidebar');
    if($('.order-now-common-row').length){
	var $stickyrStopper = $('.order-now-common-row');
    }else{
	var $stickyrStopper = $('.footer');
  }
  if ($sticky.offset()) { // make sure ".sticky" element exists
    var generalSidebarHeight = $sticky.innerHeight();
    var stickyTop = $sticky.offset().top;
    var stickyRight = ($(window).width() - ($sticky.offset().left + $sticky.outerWidth()));
    var stickyWidth = document.getElementById('sticky-sidebar').offsetWidth;
    var stickOffset = 0;
    var stickyStopperPosition = $stickyrStopper.offset().top;
    var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
    var diff = stopPoint + stickOffset;
	//if(stopPoint > generalSidebarHeight){
    $(window).scroll(function(){ // scroll event
      var windowTop = $(window).scrollTop(); // returns number
      if (stopPoint < windowTop) {
          $sticky.css({ position: 'absolute', top: diff, right:stickyRight, width:stickyWidth });
      } else if (stickyTop < windowTop+stickOffset ) {
          $sticky.css({ position: 'fixed', top: stickOffset, right:stickyRight, width:stickyWidth});
      } else {
          $sticky.css({position: 'absolute', top: 'initial', right:stickyRight, width:stickyWidth});
      }
    });
	//}

  }
}
 
function sendOfferMail(no){
 var offerEmail = $.trim($("#offerEmail"+no).val());
 var error = false;
 if ("" == offerEmail || !validateEmail(offerEmail) || offerEmail.length > 100 ){
 	$("#offerEmail"+no).removeClass('inputSuccess');
        $("#offerEmail"+no).addClass('animated shake');
        $("#offerEmail"+no).addClass('shake-error');
        setTimeout(function(){
                $("#offerEmail"+no).removeClass('animated shake');}, 1000);
        $("#offerEmail"+no).focus();
        error=true;
 }
 else {
 	$("#offerEmail"+no).removeClass('shake-error');
        $("#offerEmail"+no).addClass('inputSuccess');
        error=false;
 }
 if (error) {
       return false;
 } else {
        $("#offerBtn"+no).button("loading");
        $.ajax({
                type: 'POST',
                url: domainUrl+'/sendOfferMail.php',
                data: $.param({'email':offerEmail}),
                dataType: 'json',
                success: function(data) {
                         $("#offerBtn"+no).button("reset");
                         if(data.status == 'success'){
				setCookie("couponCodeCookie",true,2);
                                $("#offerSuccessMsg"+no).html('We have sent the coupon codes to you at your given email address. Please check for the same...');
                                $("#offerSuccessMsg"+no).css('color', 'green');
                                $("#offerForm"+no)[0].reset();
                        }else{
				$("#offerSuccessMsg"+no).html('There are some issues, Please try again');
				$("#offerSuccessMsg"+no).css('color', 'red');
			}
                },
                async: true
                });
}
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
$('.orderOnWhatsapp').hover(function(){
	if($('.whatsappText').is(':hidden')){
		$('.whatsappText').show('slow');
	}else{
		$('.whatsappText').hide('slow');
	}
});

function getLatestReviews(){
	$.ajax({
        	type: 'POST',
             	url: domainUrl+'/experts/getLatestReviews.php',
             	data: $.param({'subject':''}),
              	dataType: 'html',
               	success: function(data) {
        		localStorage.setItem('reviews', data);  	
		},
              	async: true
	});
}
function showLatestReviews(){
	var reviews = $.parseJSON(localStorage.getItem('reviews'));
	var reviewsArray = $.map(reviews, function(value, index) {
    		return [value];
	}); 
	var reviewsCount = reviewsArray.length;
	var i = 0;
	var timeGap = 2500;
	setInterval(function() {
		var reviewsHide = localStorage.getItem('reviewsHide');
		console.log(i);
		if(reviewsHide != 1 && typeof reviewsArray[i] != "undefined"){
			$('#reviewHeading').html(reviewsArray[i].reviewHeading);
			$('#reviewDescription').html(reviewsArray[i].reviewDescription);
			$('#review').show('slow');
			reviewsArray.splice(i, 1);
			i++;
			localStorage.setItem('reviews', JSON.stringify(reviewsArray));
		}
		var min = 15,
    		max = 20;
		timeGap = Math.floor(Math.random() * (max - min + 1) + min);
		timeGap = timeGap*1000;
		console.log(timeGap);
	}, 25000);
	setInterval(function() {
         	$("#review").fadeOut("slow")
        }, 24500);
}
//showLatestReviews();
function hideReview(){ 
  localStorage.setItem('reviewsHide', 1);
  $("#review").fadeOut("slow");
}

function getCompleteQuestionsByExpert() {
	var tutorId = $("#completeQuestionsExpertId").val();
	if($('#expertCompleteQuestions').length){
                $.ajax({
                type: 'POST',
                url: domainUrl+'/experts/getCompleteQuestionsByExperts.php',
                data: $.param({'tutorId':tutorId}),
                dataType: 'json',
                success: function(data) {
                        if(data.status == 'success'){
                                $('#expertCompleteQuestions').html(data.summary);
                        }
                },
                async: true
                });
	}
}

function getLatestSampleList() {
        if($('#getLatestSampleList').length){
		var pageURL = $(location).attr("href");
                $.ajax({
                type: 'POST',
                url: domainUrl+'/getLatestSampleList.php',
		data: $.param({'pageURL':pageURL}),
                dataType: 'json',
                success: function(data) {
                        if(data.status == 'success'){
                                $('#getLatestSampleList').html(data.summary);
                        }
                },
                async: true
                });
        }
}
function goToByReviews(reviewType){
    $('html,body').animate({scrollTop: ($("#homeTestimonialSection").offset().top-30)},'slow');
    $('.'+reviewType).click();
}

function getSubjectWiseReviewsList() {
        if($('#getReviewListBySubject').length){
		var pageURL = $(location).attr("href");
                $.ajax({
                type: 'POST',
                url: domainUrl+'/getSubjectWiseReviews.php',
		data: $.param({'pageURL':pageURL}),
                dataType: 'json',
                success: function(data) {
                        if(data.status == 'success'){
                                $('#getReviewListBySubject').html(data.summary);
                        }
                },
                async: true
                });
        }
}

function submitQuestionAnswerByUser(){
	var userEmail = $.trim($("#userEmail").val());
	var userQuestionAnswer = $.trim($("#userQuestionAnswer").val());
	var questionBankId = $("#questionBankId").val().trim();
	var error = error1= false;
 	if("" == userEmail || !validateEmail(userEmail) || userEmail.length > 100 ){
        $("#userEmail").removeClass('inputSuccess');
        $("#userEmail").addClass('animated shake');
        $("#userEmail").addClass('shake-error');
        setTimeout(function(){
                $("#userEmail").removeClass('animated shake');}, 1000);
        $("#userEmail").focus();
        error=true;
 	}
	else {
        $("#userEmail").removeClass('shake-error');
        $("#userEmail").addClass('inputSuccess');
        error=false;
	 }
	if("" == userQuestionAnswer){
        $("#userQuestionAnswer").removeClass('inputSuccess');
        $("#userQuestionAnswer").addClass('animated shake');
        $("#userQuestionAnswer").addClass('shake-error');
        setTimeout(function(){
                $("#userQuestionAnswer").removeClass('animated shake');}, 1000);
        $("#userQuestionAnswer").focus();
        error1=true;
        }
        else {
        $("#userQuestionAnswer").removeClass('shake-error');
        $("#userQuestionAnswer").addClass('inputSuccess');
        error1=false;
         }
 	if (error || error1) {
       	return false;
	} else {
        $("#submitBtn").button("loading");
	$.ajax({
                type: 'POST',
                url: domainUrl+'/questions/submitAnswerByUser.php',
                data: $.param({'email':userEmail, 'userQuestionAnswer':userQuestionAnswer}),
                dataType: 'json',
                success: function(data) {
                         $("#submitBtn").button("reset");
                         if(data.status == 'success'){
        			localStorage.setItem('submitAnswer_'+questionBankId, questionBankId);
                                $("#answerSuccessMsg").html(data.message);
                                $("#answerSuccessMsg").css('color', 'green');
				$("#submitAnswerQuestionDiv, #submitBtn").hide();
				$("#answerSuccessMsg").show();
				$("#submitAnswerForm")[0].reset();
                        }else{
                                $("#answerSuccessMsg").html(data.message);
                                $("#answerSuccessMsg").css('color', 'red');
                        }
                },
                async: true
                });
}

}

function voteQuestionAnswer(value){
	var questionBankId = $("#questionBankId").val().trim();
	var upvote = $("#upvote").text();
	var downvote = $("#downvote").text();
	$.ajax({
		type: 'POST',
		url: domainUrl+'/questions/questionVote.php',
		data: $.param({'questionBankId':questionBankId,'upvote':upvote,'downvote':downvote, 'value':value}),
		dataType: 'json',
		success: function(data){
			if(data.status == 'success'){
				if(value == 'upvote'){
                			upvote++;
                			$("#upvote").text(upvote);
        			}else if(value == 'downvote'){
                			downvote++;
                			$("#downvote").text(downvote);
        			}
				$("#upvote").text(data.upVote);
				$("#downvote").text(data.downVote);

			}
		}

	});
	async: true

}

function checkAlreadyAnswerSubmitByUser(){
	var questionBankId = $("#questionBankId").val().trim();
	var storageQuestionBankId = localStorage.getItem('submitAnswer_'+questionBankId);
	if(storageQuestionBankId == questionBankId){
		$("#answerSuccessMsg").html('Your message is in under moderation!!');
		$("#answerSuccessMsg").css('color', 'green');
                $("#submitAnswerQuestionDiv, #submitBtn").hide();
	}else{
		$("#submitAnswerQuestionDiv, #submitBtn").show();
	}
}

$(function() {
    if($('.masonry').length) {
    $('.masonry').masonry();
    }
});

function showSendOTPLoginForm() {
	$("#confirmLoginOtpDiv").hide();	
	$(".loginWithOtp-div").show();
}


function sendLoginOtp(actionType) {
	var phoneCode = $("#phoneCode").val().trim();
	var contactNumber = $("#contactNumber").val().trim();
	$("#otpSendSuccessResponse").hide();
	if(contactNumber.length < 8) {
		$("#contactNumber").addClass('shake-error animated shake');
		setTimeout(function(){$("#contactNumber").removeClass('animated shake');}, 1000);
		$("#contactNumber").focus();
                return false;
	} else {
		$("#contactNumber").removeClass('shake-error');  
		if(actionType == 'resend') {
            	$("#resendLoginOtpLink").hide();
            	$("#spinnerResendOtp").removeClass('hidden');                  
    	} else {
		$("#sendOTPtoLogin").button('loading');
		$("#sendOTPtoLogin").prop('disabled', true);
		}
		$.ajax({
		type:'post',
		url:domainUrl+'/orders/sendLoginOtp.php',
		data:$.param({'phoneCode':phoneCode,'contactNumber':contactNumber}),
		dataType:'json',
		success:function(data) {
			if(data.response == 'success') {
				$(".loginWithOtp-div").hide();
				$("#otpSentToMobile").text('+'+phoneCode+' '+contactNumber);
				$("#confirmLoginOtpDiv").show();
				$("#otpChar1").focus();
				if(actionType == 'resend') {
					$("#resentOtpAlert").show();
					setTimeout(function() {$("#resentOtpAlert").hide()}, 5000);
				}
				$("#otpSendSuccessResponse").html('OTP Send Successfully.').show();
			} else if(data.response == 'error') {
				$("#otpResponse").html('OTP could not be sent. Please contact to support team over chat');
			} else if(data.response == 'invalid') {
				$("#otpResponse").html('Wrong Contact number or phone code.');
				$("#contactNumber").css('border', '1px solid red');
            			$("#contactNumber").focus();
			} else {
				$("#otpResponse").html('Some error just occured. Please try again');
			}
			if(actionType == 'resend') {
				$("#otpChar1, #otpChar2, #otpChar3, #otpChar4").val('');
            			$("#resendLoginOtpLink").show();
           	 			$("#spinnerResendOtp").addClass('hidden');
			} else {
				$("#sendOTPtoLogin").button('reset');
				$("#sendOTPtoLogin").prop('disabled', false);
			}
		},
		async:true
	});
	}
}
function shiftPointerToNext(current, next) {
	if(current.value != '' && $.isNumeric(current.value)) {
                if(event.keyCode == 8 || event.charCode == 46) {
                        current.value = '';
                } else {
                        if(event.keyCode != 9 && next.value != '') {
                                $("#"+next).focus();
                        }
                }
        }
}

function verifyLoginOtp() {
	$("#otpChar4").next(alert).css('display', 'none');
	var otpChar1 = $("#otpChar1").val().trim();
        var otpChar2 = $("#otpChar2").val().trim();
        var otpChar3 = $("#otpChar3").val().trim();
        var otpChar4 = $("#otpChar4").val().trim();
	if(otpChar1 != '' && otpChar2 != '' && otpChar3 != '' && otpChar4 != '') {
		$("#confirmOTPtoLogin").button('loading');
		$("#confirmOTPtoLogin").prop('disabled', true);
		var otp = otpChar1+otpChar2+otpChar3+otpChar4;
		$.ajax({
			type:'post',
			url:domainUrl+'/orders/verifyLoginOtp.php',
			data:$.param({'otp':otp}),
			dataType:'json',
			success:function(data) {
				console.log(data);
				if(data.response == 'success') {
					window.location.assign(domainUrl+'/login');
				} else {
					alert(data.responseMessage);
					$("#otpChar1, #otpChar2, #otpChar3, #otpChar4").val('');
				}
				$("#confirmOTPtoLogin").button('reset');
                		$("#confirmOTPtoLogin").prop('disabled', false);
			},
			async:true
		});
	} else {
		$("#otpChar4").next(alert).css('display', 'inline');
		if(otpChar1 == '') {
			$("#otpChar1").focus();
		} else if(otpChar2 == '') {
			$("#otpChar2").focus();
		} else if(otpChar3 == '') {
			$("#otpChar3").focus();
		} else {
			$("#otpChar4").focus();
		}
	}
}

$(function() {
if($('.masonry').length) {
var $masonry = $('.masonry').masonry();

var data = $('.masonry').html();

// $masonry.push($(data).find('.resource-service'));
$(data).find('.resource-service').each(function() {
$masonry.push($(this));
});
}
});

function sendOfferOnWhatsapp(no){
 var isdCode = $("#isdCode"+no).val().trim();
 var whatsappNumber = $.trim($("#offerWhatsappNumber"+no).val());
 var error = false;
 if ("" == whatsappNumber){
        $("#offerWhatsappNumber"+no).removeClass('inputSuccess');
        $("#offerWhatsappNumber"+no).addClass('animated shake');
        $("#offerWhatsappNumber"+no).addClass('shake-error');
        setTimeout(function(){
                $("#offerWhatsappNumber"+no).removeClass('animated shake');}, 1000);
        $("#offerWhatsappNumber"+no).focus();
        error=true;
 }
 else {
        $("#offerWhatsappNumber"+no).removeClass('shake-error');
        $("#offerWhatsappNumber"+no).removeClass('inputSuccess');
        error=false;
 }
 if (error) {
       return false;
 } else {
        $("#offerWhatsappBtn"+no).button("loading");
        $.ajax({
                type: 'POST',
                url: domainUrl+'/sendOfferOnWhatsapp.php',
                data: $.param({'isdCode':isdCode, 'whatsappNumber':whatsappNumber}),
                dataType: 'json',
                success: function(data) {
                         $("#offerWhatsappBtn"+no).button("reset");
                         if(data.status == 'success'){
                                setCookie("couponCodeCookie",true,2);
                                $("#offerWhatsappSuccessMsg"+no).html(data.msg);
                                $("#offerWhatsappSuccessMsg"+no).css('color', 'green');
                                $("#offerWhatsappForm"+no)[0].reset();
			        if(typeof countryCode !== 'undefined'){
                			$(".selectedPhoneCodeLi"+countryCode).click();
        			}
                        }else{
                                $("#offerWhatsappSuccessMsg"+no).html(data.msg);
                                $("#offerWhatsappSuccessMsg"+no).css('color', 'red');
                        }
                },
                async: true
                });
}
}

function setSelectedPhoneCode(phoneCode, countryCode, no) {
        $("#selectedPhoneCode"+no).html("<img src='"+imageUrl+"/flags/"+countryCode.toLowerCase()+".png' style='display:inline-block'></span><span id='phoneCodePick'> + "+phoneCode+"</span>");
        $("#isdCode"+no).val(phoneCode);
}

function showImages(id, hid) {
	if($(hid).val() == "false") {
	$(id).each(function() {
		$(this).attr('src', $(this).attr('data-src'));
	})
	$(hid).val("true");
	}
}
