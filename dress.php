<?php
    error_reporting(E_ALL & ~E_NOTICE); //clear errors

    if (!file_exists('dresses.json')) { //check if file found 
        echo "Error: dresses.json not found."; //error
        exit;
    }

    $array = file_get_contents('dresses.json');//load json array into php var step2
    $data = json_decode($array, true); //step3 decoding

    if ($data === null) {
        echo "Error: Failed to decode dresses.json."; //error echo
        exit;
    }

    $dresses = $data['Dresses']; //get array of article data

    libxml_use_internal_errors(true); //clear errors
    $doc = new DOMDocument(); //new dom
    $doc->loadHTMLFile("dress.html"); //load
    libxml_clear_errors(); //clear errors

    function createDresses($doc, $dresses){
    $divDresses = $doc->getElementById('dressList'); //get members div
    foreach ($dresses as $dress) { //for each article
        $div = $doc->createElement('div');//make div
        $div->setAttribute('class','boxes');

        $name = $doc->createElement('h3');//make h1 tag
        $name->textContent = $dress['name'];
        $div->appendChild($name);  //close

        $ul = $doc->createElement('ul');//make ul
        $ul->setAttribute('class', 'tags');//add class
        foreach ($dress['tags'] as $tag) { //for each tag
            $li = $doc->createElement('li'); //create list
            $li->setAttribute('class', 'tag');//add class
            $li->textContent = $tag; //add name
            $ul->appendChild($li); //close
        }
        $div->appendChild($ul); //close


        $img= $doc->createElement('img');
        $img->setAttribute('class','dress');
        $img->setAttribute('src', $dress['photo']);
        $img->setAttribute('alt', $dress['name']);
        $div->appendChild($img);
        $divDresses->appendChild($div);//close
    }
    }

    createDresses($doc, $dresses);

    header('Content-Type: text/html'); //change header
    echo $doc->saveHTML();//send html
?>