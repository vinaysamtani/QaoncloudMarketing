<?php
include_once("mysql_config.php");

mysql_connect($host,$user,$pwd) or die('Connection failed!'.mysql_error());
mysql_select_db($db)or die('Could not connect to database.'.mysql_error());

$name=$_POST['name'];
$email=$_POST['email'];
$contactno=$_POST['contactno'];
$message=$_POST['message'];
$date=date('d-m-Y');

$insert="insert into $table1 (name,email,contactno,message,date) values('$name','$email','$contactno','$message','$date')";
	
$result=mysql_query($insert);

if($result)
{
	$to=$email;
	$subject="Thank you for registering with QAonCloud";
	$header="From: tanu@qaoncloud.com".
			"From:Tanushree";
    $mail_content="Dear $name,\r\n\r\n".
				  "Thanks for contacting QAonCloud. \r\n\r\n".
				  "We will look at your needs and get back to you within 24 hours. You will get access to the QAonCloud platform soon.\r\n\r\n".
		          "In case your email has gone to spam, please enable your spam filter to accept emails from our domain name.\r\n\r\n".
                  "Warm regards,\r\n".
		          "Tanushree Jana\r\n".
		          "Business Head | www.qaoncloud.com\r\n".
		          "+919500122675, Timezone: GMT + 5:30 | Skype: tanu_jana\r\n\r\n".
		          "Linkedin: in.linkedin.com/in/tanushreejana/";
	  
	$mail_content = wordwrap($mail_content, 300);
    $sentmail=mail($to,$subject,$mail_content,$header);

	if($sentmail)
	{
		$to_dc='tanu@desicrew.in';
		$subject_dc=$email;
		$header_dc="From:admin@qaoncloud.com".
			       "From:Admin";
		$message_dc="Dear Tanu,\r\n\r\n".
		        	"New User has been registered to the site with the following details.\r\n".
			        "Name: $name\r\n".
			        "Email address: $email,\r\n".
			        "Contactno: $contactno,\r\n".
			        "Message: $message.\r\n\r\n".
			        "Thanks,\r\n".
		        	"Admin.";
		$message_dc = wordwrap($message_dc, 300);
		$sentmail_dc=mail($to_dc,$subject_dc,$message_dc,$header_dc);
	}
	echo "<br><br><br><br><br><br><center><font size='8px;'>Thank you for the signup. Soon you will be redirected to Home page</font></center>";
	header('Refresh:2;url=index.php');
}
?>