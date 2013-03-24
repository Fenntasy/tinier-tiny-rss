<?php
$page = $_GET['page'];

libxml_use_internal_errors(true);
//$sxe = new SimpleXMLElement(, NULL, TRUE);
//echo $sxe->asXML();

$doc = new DOMDocument();
$doc->loadHTMLFile($page);
echo $doc->saveHTML();
//
//$posts = $doc->getElementsByTagName('div');
//
//$element = 0;
//
//foreach($posts as $post) {
//    $element++;
//    if ($post->getAttribute('class') && strstr($post->getAttribute('class'), ' post ')) {
//        break;
//    }
//}
//
//if ($element) {
//    echo $doc->saveXML($posts->item($element));
//}