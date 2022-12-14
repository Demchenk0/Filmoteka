const gallery = document.querySelector('.gallery-list');
import { getSpinner } from './spiner';

import { createPagination } from './pagination';
import UnsplashAPI from './fetch-films';
const unsplashAPI = new UnsplashAPI();

// !--------Popular Films to main-------------------

async function popularFilms() {
  const spinner = getSpinner();

  try {
    gallery.append(spinner);

    const result = await unsplashAPI.fetchPopularFilms();
    // console.log(result);
    const pagination = createPagination({
      totalItems: result.total_results > 10000 ? 10000 : result.total_results,
      page: result.page,
    });
    pagination.on('afterMove', event => {
      unsplashAPI.page = event.page;
      //  console.log(unsplashAPI.page);
      unsplashAPI.fetchPopularFilms().then(result => {
        //  console.log(result);
        renderGalleryItems(result.results);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    renderGalleryItems(result.results);
  } catch (error) {
    console.log(error.message);
  } finally {
    spinner.remove();
  }
}

popularFilms();

// ?-----------------Render Gallery----------------

export async function renderGalleryItems(films) {
  try {
    const { genres } = await unsplashAPI.fetchGeneres();
    // console.log(genres);
    const generesConfig = getGeneresConfig(genres);
    // console.log(generesConfig);
    // console.log(films);
    const markup = films
      .map(film => {
        return `<li class='list-item'>
      <img class='poster' src="${
        film.poster_path === null
          ? new URL('../images/gallery/question-mark.jpeg', import.meta.url)
          : `https://image.tmdb.org/t/p/w500${film.poster_path}`
      }"
  alt="${film.title}" name="${film.id}"
  /><h2 class='title'>${film.title}</h2>
  <p class='info'>${
    mapGanereId(film.genre_ids, generesConfig) || 'Unknown'
  } &#124 ${film.release_date.slice(0, 4) || 'Unknown'}</p></li>`;
      })
      .join('');
    gallery.innerHTML = markup;
  } catch (error) {
    console.log(error.message);
  }
}

// ?----------------Replaces 'id' with ganeres 'name'---------

export function mapGanereId(filmGeneresId, generesConfig) {
  return filmGeneresId
    .map(generes => {
      return generesConfig[generes] || 'Unknown';
    })
    .join(', ');
}

// ?-------------------Make Obj with id: name------------

export function getGeneresConfig(allGeneres) {
  return allGeneres.reduce((previousValue, { name, id }) => {
    return { ...previousValue, [id]: name };
  }, {});
}
