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

    $main = $doc->getElementsByTagName('main')->item(0); //get main

    foreach ($members as $member) { //for each article
        $div = $doc->createElement('div');//make div
        $div->setAttribute('class','boxes');

        $h3 = $doc->createElement('h3');//make h1 tag
        $h3->textContent = $member['position'];
        $div->appendChild($h3);  //close
        $img= $doc->createElement('img');
        $img->setAttribute('class','person');
        $img->setAttribute('src', $member['photo']);
        $img->setAttribute('alt', $member['name']);
        $div->appendChild($img);



        $main->appendChild($div);//close
    }

    header('Content-Type: text/html'); //change header
    echo $doc->saveHTML();//send html
?>