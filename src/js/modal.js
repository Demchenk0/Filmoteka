import UnsplashAPI from './fetch-films';
const unsplashAPI = new UnsplashAPI();

import { getGeneresConfig } from './gallery';
import { getSpinner } from './spiner';

import { onModalBtnClick } from './library-locale-storage';
const gallery = document.querySelector('.gallery-list');
const modalBackdrop = document.querySelector('.backdrop');
const modalWrap = document.querySelector('.modal__contents');
const closeBtn = document.querySelector('.modal__btn-close');

// ?_________________OPEN MODAL_______________

async function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const spinner = getSpinner();
  const filmId = e.target.name;

  try {
    // append to the list spinner
    modalBackdrop.append(spinner);

    const result = await unsplashAPI.fetchFilmInfo(filmId);
    modalBackdrop.classList.toggle('is-hidden');
    // console.log(result);

    try {
      await renderModal(result);
      onModalBtnClick(result);
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    spinner.remove();
  }
  document.addEventListener('keydown', closeModalEsc);
  closeBtn.addEventListener('click', closeModalOnBtnClick);
  document.addEventListener('click', closeModal);
}

gallery.addEventListener('click', openModal);
closeBtn.removeEventListener('click', closeModalOnBtnClick);
document.removeEventListener('keydown', closeModalEsc);
document.removeEventListener('click', closeModal);
// ?_____________CLOSE MODAL______________

function closeModal(e) {
  if (e.target === modalBackdrop) {
    modalBackdrop.classList.toggle('is-hidden');
    document.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalEsc);
  }
}

function closeModalEsc(e) {
  if (e.code === 'Escape') {
    modalBackdrop.classList.toggle('is-hidden');
    document.removeEventListener('keydown', closeModalEsc);
  }
}

function closeModalOnBtnClick(e) {
  modalBackdrop.classList.toggle('is-hidden');
}

// ?___________________Modal RENDER

async function renderModal(film) {
  try {
    const { genres } = await unsplashAPI.fetchGeneres();
    // console.log(genres);
    const generesConfig = getGeneresConfig(genres);
    // console.log(generesConfig);

    const markup = `<img src="${
      film.poster_path === null
        ? new URL('../images/gallery/question-mark.jpeg', import.meta.url)
        : `https://image.tmdb.org/t/p/w500${film.poster_path}`
    }" alt="photo" class="modal__poster" />
        <div>
          <h2 class="modal__title">${film.title.toUpperCase() || 'Unknown'}</h2>
          <table class="modal__info">
            <tr>
              <th>Vote/Votes</th>
              <td>
                <span class="modal__info--accent">${
                  film.vote_average || 'Unknown'
                }</span> /
                <span class="modal__info--noaccent">${
                  film.vote_count || 'Unknown'
                }</span>
              </td>
            </tr>
            <tr>
              <th>Popularity</th>
              <td>${film.popularity || 'Unknown'}</td>
            </tr>
            <tr>
              <th>Original Title</th>
              <td>${film.original_title || 'Unknown'}</td>
            </tr>
            <tr>
              <th>Genre</th>
              <td>${
                film.genres
                  .map(genere => {
                    return genere.name;
                  })
                  .join(', ') || 'Unknown'
              }</td>
            </tr>
          </table>
          <h3 class="modal__about--title">About</h3>
          <p class="modal__about">
            ${film.overview || 'Unknown'}
          </p>
              <div class="modal__btn">
      <button type="button" class="modal__btn-watched">add to Watched</button>
      <button type="button" class="modal__btn-queue">add to queue</button>
    </div>

        </div>`;

    modalWrap.innerHTML = markup;
  } catch (error) {
    console.log(error.message);
  }
}
