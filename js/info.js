const shareButton = document.querySelector('.share-btn');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');

shareButton.addEventListener('click', event => {
  if (navigator.share) { 
   navigator.share({
      title: 'Partyhub - Rozkręć swoją impreze',
      url: 'https://lilmilek.github.io/partyhub/'
    }).then(() => {

    })
    .catch(console.error);
    } else {
        shareDialog.classList.add('is-open');
    }
});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});