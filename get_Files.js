
function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}

getJSONP("https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26a91c-5069cbc6b1ca/:resource[?:parameters]", function(data){
    console.log(data);
});  
