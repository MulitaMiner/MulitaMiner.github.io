# MulitaMiner.github.io

Project website for **MulitaMiner**, an automated, LLM-based tool that extracts and
structures vulnerabilities from heterogeneous PDF reports produced by security scanners
(OpenVAS, Tenable WAS).

🌐 **Live site:** https://mulitaminer.github.io

This is a zero-build static site (plain HTML, CSS and JavaScript) served directly by
GitHub Pages. It is available in three languages (Portuguese, Spanish, English) via an
in-page language switcher.

## Structure

```
index.html                 # single-page landing
assets/
  css/style.css            # brand styles (orange + charcoal, armadillo motif)
  js/i18n.js               # PT/ES/EN language switcher (data-i18n driven)
  js/main.js               # mobile nav + copy-to-clipboard
  data/translations.js     # all copy for the three languages
  img/                     # logos and favicon
.nojekyll                  # serve files as-is (no Jekyll processing)
```

## Local preview

Any static file server works, for example:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Related repositories

- MulitaMiner: https://github.com/AnonShield/MulitaMiner
- Vulnerability Extractor: https://github.com/AnonShield/Vulnerability_Extractor
- Paper (ERRC/SBC): https://sol.sbc.org.br/index.php/errc/article/view/39195

## License

Site code is released under the MIT License.
