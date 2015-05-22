$(document).ready(function(){

		function verify_email(content)
		{
			console.log(content);
			var request;
			var result;
			var mail_id=content;
			if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari 
			{
				request=new XMLHttpRequest();
			}
			else // code for IE6, IE5
			{
				request=new ActiveXObject("Microsoft.XMLHTTP");
			}			
		
			request.open("POST","mail_test.php",false);
			request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			request.send("mail_id="+encodeURIComponent(mail_id));
			result=request.responseText;
			console.log(result);
			return result;
		}
		function GetEmailParts( content )
		{
			// Set up a default structure with null values 
			// incase our email matching fails.
			var objParts =
			{
				user: null,
				domain: null,
				ext: null
			};
    
			// Get the parts of the email address by leveraging
			// the String::replace method. Notice that we are 
			// matching on the whole string using ^...$ notation.
			content.replace( 
			new RegExp( "^(.+)@(.+)\\.(\\w+)$" , "i" ), 
        
			// Send the match to the sub-function.
				function( $0, $1, $2, $3 )
				{
					objParts.user = $1;
					objParts.domain = $2;
					objParts.ext = $3;
				}
			);
    
			// Return the "potentially" updated parts structure.
			return( objParts.domain );
		}
		function verify_company_code(company_code)
		{
			var request;
			var result;
			
			if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari 
			{
				request=new XMLHttpRequest();
			}
			else // code for IE6, IE5
			{
				request=new ActiveXObject("Microsoft.XMLHTTP");
			}			
		
			request.open("POST","company_code_test.php",false);
			request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			request.send("company_code="+encodeURIComponent(company_code));
			result=request.responseText;
	
			return result;
		}
	var jVal = {
		'name_test' : function() {

			var nameInfo = $('#nameInfo');
			var ele = $('#name');
		
			var value=ele.val();
	
			if(ele.val().length < 1) {
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				nameInfo.html('Name is required').show();
			} 
			
			else if(value.match(/\d+/g)){
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				nameInfo.html('Name cannot have numbers').show();
			}
			else if(value.match(/^[\\p{L} .'-]+$/)){
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				nameInfo.html('Name cannot have special characters').show();
			}
			else {
					ele.closest('.form-group').removeClass('has-error').addClass('has-success');
					nameInfo.hide();
			}
		},
		
		'email_test' : function() {	
			var emailInfo = $('#emailInfo');
			var ele = $('#email');
			
			var content=ele.val();
			var patt =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/;
			if(ele.val().length < 1) {
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				emailInfo.html('Email address is required').show();
			} 
			else if(!patt.test(ele.val())){
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				emailInfo.html('Invalid e-mail address.').show();	
			} 
			else 
			{
				ele.closest('.form-group').removeClass('has-error').addClass('has-success');	
				emailInfo.hide();
			}
		},		

		
		'contact_no_work_test' : function() {

			var contactInfo = $('#contactInfo');
			var ele = $('#contactno');
			var patt=/^([a-zA-Z,#/ \.\(\)\-\+\*]*[0-9]){10}[0-9a-zA-Z,#/ \.\(\)\-\+\*]*$/;
			
			if((ele.val().length < 1)) {
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				contactInfo.html('Contact Number is required.').show();	
			}
			else if(!patt.test(ele.val())){
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				contactInfo.html('Invalid contact number.').show();	
			} 
 
			else {
					ele.closest('.form-group').removeClass('has-error').addClass('has-success');
					contactInfo.hide();
				}
		},
		'message_test' : function() {

			var messageInfo = $('#messageInfo');
			var ele = $('#message');
			
			if((ele.val().length =='')) 
			{
				jVal.errors = true;
				ele.closest('.form-group').removeClass('has-success').addClass('has-error');
				messageInfo.html('Message is required.').show();	
			} 
			else 
			{
				ele.closest('.form-group').removeClass('has-error').addClass('has-success');	
				messageInfo.hide();
			}
		},
		'sendIt': function(){
			if(!jVal.errors){
				$('#jform').submit();
			}
		}
		
	};	
	$('#send_form').click(function(){
	
			jVal.errors=  false;
			jVal.name_test();
			jVal.email_test();
			jVal.contact_no_work_test();
			jVal.message_test();
			jVal.sendIt();
			return false;
		});

	$('#name').blur(jVal.name_test);
	$('#name').change(jVal.name_test);
	$('#email').blur(jVal.email_test);
	$('#email').blur(jVal.email_test);
	$('#message').blur(jVal.message_test);
	$('#message').change(jVal.message_test);
	$('#contactno').blur(jVal.contact_no_work_test);
	$('#contactno').change(jVal.contact_no_work_test);
});