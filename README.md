# userscripts

## English

### How to use

I use my userscripts with Violentmonkey on Firefox

- https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/
- https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag

It must normally work on Greasemonkey and Tampermonkey, but feel free to fill an issue if you have an issue.

### Compare Amazon prices

The goal is to have a way to easily check the price of multiple domain for an article.

- You can fill the DOMAIN_LIST in the script, if you do, don't hesitate to make a pull request, so it can be updated for everyone
- I noticed that multiple product on the page doesn't work, my first though it that I need to trigger the comparison with an event when the page reload, but it's still not done yet

### Alert before order validation on Amazon

This script is designed to alert you when your order is soon confirmed on Amazon.

- You can easily customize this script by modifying the alert message text or adding new sites to monitor.
- Simply replace the `CONFIRMATION_MESSAGE` constant with your desired text, or add more elements to the `elements` array!

## French

### Utilisation

J'utilise mes userscripts avec Violentmonkey sur Firefox.

- https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/
- https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag

Normalement, cela devrait fonctionner avec Greasemonkey et Tampermonkey, mais n'hésitez pas à signaler un problème si vous en rencontrez un.

#### Comparer les prix sur Amazon

Le but est d'avoir un moyen de vérifier facilement le prix d'un article sur plusieurs domaines.

- Vous pouvez remplir la liste de domaines (DOMAIN_LIST) dans le script. Si vous le faites, n'hésitez pas à proposer une demande de pull (pull request) afin qu'elle puisse être mise à jour pour tout le monde.
- J'ai remarqué que plusieurs produits sur la page ne fonctionnent pas. Ma première idée est de déclencher la comparaison avec un événement lorsque la page se recharge, mais cela n'a pas encore été fait.

### Alerte avant la validation d'une commande Amazon

Ce script est conçu pour vous alerter lorsque votre commande est bientôt confirmée sur Amazon.

- Vous pouvez facilement personnaliser ce script en remplaçant le texte du message d'alerte par le vôtre ou en ajoutant des nouveaux sites e-commerce à surveiller.
- Simplement remplissez la constante `CONFIRMATION_MESSAGE` avec le texte que vous souhaitez, ou ajoutez plus de éléments à l'array `elements` !

