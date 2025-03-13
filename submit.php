<?php

    $username = addcslashes($_post['name']);
    $useremail = addcslashes($_post['email']);
    $usercel = addcslashes($_post['cel']);

    $to = "well.lyma0@gmail.com"
    $subject = "Coleta de dados - Welliton.DEV"
    $bodyemail ="Nome: ".$username."\n"."Email: ".$useremail."\n"."Telefone: ";
    $header = "From: welliton.s.lima1@gmail.com"."\n"."Reply-to: ".$email."\n"."X=Mailer:PHP/".phpversion()

    if(mail($to,$subject,$bodyemail,$header)){
        echo("E-mail enviado com sucesso.");
    }
    else{
        echo("Erro ao enviar E-mail").
    }

?>
