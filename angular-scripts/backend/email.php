<?php
		require_once('phpmailer/PHPMailerAutoload.php');
        require_once('phpmailer/class.phpmailer.php');
        
        $subject = 'Una Persona Desea Suscribirse';
        $email = $_REQUEST['mail'];
		// $name = $_REQUEST['name'];
		// $phone = $_REQUEST['phone'];
        // $msg = $_REQUEST['msg'];
		$mail = new PHPMailer();
		//indico a la clase que use SMTP
		$html="
		<html>
		<head>
		<body>
		<h2><strong>Correo Electronico:</strong>\" $email \"</h2>	  <br>
		</body>
		</head>
		</html>
	";

		$mail->IsSMTP();
		$mail->SMTPOptions = array(
		   'ssl' => array(
			 'verify_peer' => false,
			 'verify_peer_name' => false,
			 'allow_self_signed' => true
		   )
		);
		//permite modo debug para ver mensajes de las cosas que van ocurriendo
		$mail->SMTPDebug=1;
		//Debo de hacer autenticación SMTP
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = "ssl";
		//indico el servidor de Gmail para SMTP
		$mail->Host = "smtp.gmail.com";
		// $mail->Host = "localhost";

		//indico el puerto que usa Gmail
		$mail->Port = 465;

		$mail->Username = "reyny307@gmail.com";
		$mail->Password = "24404803reyny";
		
		//Remitente
        $mail->SetFrom($email, $name);
        $mail->AddReplyTo($email);

		$mail->Subject = ($subject);
		
		$mail->CharSet = 'UTF-8';
		
		$mail->MsgHTML($html);

		//indico destinatario
		$address = $email ;
		$mail->AddAddress('reyny307@gmail.com');

if($mail->Send()){
    $Json['success'] = "Message send";
    echo json_encode($Json);
}else{
    $Json['error'] = "Message not send";
    echo json_encode($Json);
}
?>