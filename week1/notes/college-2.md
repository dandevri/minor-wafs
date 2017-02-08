# WAFS - College 2

## Weekly Nerd

Samenvatting in een paar regels; 3 sprekers in een blogpost
uitlichten. GitHub repo, html / markdown met github pages
publishen. Hou alles lekker op GitHub, ben je daar ook nog even mee bezig.

## Recap

### Scope / IFFE
Uiteindelijk gaan denken in modules. Vanilla JavaScript code structureren.

Iffe function geeft Global Scope aan. **Global Scope** overal beschikbaar, is window als je JS inlaadt. In node een Object.

Als JS runt / parsed wordt de global scope uitgevoerd. Met een iffe maak je een tweede scope, function scope. *Lexical scope*. Alles
wat je binnen die function defined is niet te benaderen vanuit buitenaf.

Waarom wil je niet in global scape; secure, variables gaat met elkaar clashen.

### Objects literal
Key-value pairs. Properties en methods gelijk aanspreken binenn anonieme function. Steeds nieuwe objecten maken; D.R.Y. **Object literal** is niet de beste manier. Als je het object gebruikt kan je hem gelijk aanroepen. *Single pun* Dingen die je maar 1 keer nodig hebt. `this` verwijst naar het object / context. Eerst de properties en dan de methods maar is niet verplicht.


### Module pattern
Anonieme functie wordt gelijk uitgevoerd en slaat het resultaat op in de variable. Functie returned een object. Met properties.

Underscore naming convention; regels met elkaar afgesproken maar het is geen standaard. Alleen modules staan in de Global Scope.

### Object constructor

Constructor functions beginnen met een hoofdletter. Parametere is eigenlijk het object wat je wilt aanmaken.

**.prototype**;  Inhteritance, elk object heeft een prototype. Schrijft een soort blauwdruk wat een object moet zijn. Nieuwe objecten maken als parameter van de function. **Beste manier**

Alles wat in een iffe staan in een variable zetten. Return daarin het object. Dit is wat er onderwater gebeurd als je in React classes gebruikt.

Scope & Context is nu het belangrijks om te snappen.

Consistentie in GitHub, naming convention.

## Opdrachten

Gaat alleen om aanbrengen van structuur, het hoeft niet te werken. Welke functies kan je bij elkaar in een object zetten? (methods)


## 4. Refactor code

* var Array, kan beter congif / setup.
* Moeilijkste dingen in code, naming convention. Consequent zijn is belangrijk.
* camelCase niet  _ underscore.
* Let op overbodige white space.
* Object alleen weten wat relevant is voor Object.
