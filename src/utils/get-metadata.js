const {dom, out, rule, ruleset, type} = require('fathom-web');

function getDocumentObject(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

module.exports = function (html) {
    const doc = getDocumentObject(html);
    const typeAndNote = type('titley').note(fnode => fnode.element.getAttribute('content'));
    const rules = ruleset(
        rule(dom('meta[property="og:title"]'),
             typeAndNote.score(50)),
        rule(dom('meta[name="twitter:title"]'),
             typeAndNote.score(40)),
        rule(dom('meta[property="twitter:title"]'),
             typeAndNote.score(30)),
        rule(dom('meta[name="hdl"]'),
             typeAndNote.score(20)),
        rule(dom('title'),
             typeAndNote.score(10).note(fnode => fnode.element.text)),
        rule(type('titley').max(), out('bestTitle'))
    );
    // Start timing here.
    const start = Date.now();
    const facts = rules.against(doc);
    const title = facts.get('bestTitle')[0].noteFor('titley');
    const end = Date.now();
    // Stop timing here.
    console.log("HOOOO");
    console.log(title);
    return {url: end - start + 'ms', title: title};
};
