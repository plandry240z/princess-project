<?php
    error_reporting(E_ALL & ~E_NOTICE); //clear errors

    if (!file_exists('home.json')) { //check if file found 
        echo "Error: articles.json not found."; //error
        exit;
    }

    $array = file_get_contents('home.json');//load json array into php var step2
    $data = json_decode($array, true); //step3 decoding

    if ($data === null) {
        echo "Error: Failed to decode home.json."; //error echo
        exit;
    }

    $members = $data['Members']; //get array of article data

    libxml_use_internal_errors(true); //clear errors
    $doc = new DOMDocument(); //new dom
    $doc->loadHTMLFile("home.html"); //load
    libxml_clear_errors(); //clear errors

    $divMembers = $doc->getElementById('members'); //get members div

    foreach ($members as $member) { //for each article
        $div = $doc->createElement('div');//make div
        $div->setAttribute('class','boxes');

        $position = $doc->createElement('h3');//make h1 tag
        $position->textContent = $member['position'];
        $div->appendChild($position);  //close
        $img= $doc->createElement('img');
        $img->setAttribute('class','person');
        $img->setAttribute('src', $member['photo']);
        $img->setAttribute('alt', $member['name']);
        $div->appendChild($img);
        $name = $doc->createElement('h4');//make h1 tag
        $name->textContent = $member['name'];
        $div->appendChild($name);  //close
        $email = $doc->createElement('h6');//make h1 tag
        $email->textContent = $member['email'];
        $div->appendChild($email);  //close
        $divMembers->appendChild($div);//close
    }

    header('Content-Type: text/html'); //change header
    echo $doc->saveHTML();//send html
?>