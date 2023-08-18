const sort_arr = ["like", "view", "open", "delete"];
let sort_index = 0;

function listingMovies(num = 0) {
  $(document).ready(() => {
    $.ajax({
      type: "GET",
      url: `api/movies/sort_${sort_arr[num]}`,
      data: {},
      success: function (response) {
        const cur_btn = $(`.sort_btns > button:nth-child(${sort_index + 1})`);
        if (sort_index !== 3) cur_btn.removeClass("btn_accent");
        else cur_btn.removeClass("delete_btn_accent");
        sort_index = num;
        const sec_btn = $(`.sort_btns > button:nth-child(${sort_index + 1})`);
        if (sort_index !== 3) sec_btn.addClass("btn_accent");
        else sec_btn.addClass("delete_btn_accent");
        if (response.ok) {
          const movies_container = $(".movies_container");
          movies_container.empty();
          for (let movie of response.movies) {
            const card = `
                    <div class="movie_card card">
          <div class="movie_info">
            <img class="movie_image" src="${movie.image_url}"/>
            <div class="movie_info_detail">
              <h3 class="movie_title">${movie.title}</h3>
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-hand-thumbs-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                  />
                </svg>
                ${movie.like}
              </h5>
              <h5>누적관객수 ${movie.view_text}</h5>
              <h5>개봉일 ${movie.open_year}년 ${movie.open_month}월 ${
              movie.open_day
            }일</h5>
            </div>
          </div>
          <div class="movie_btns">
            <button class="center_align">
              위로!
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-hand-thumbs-up"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                />
              </svg>
            </button>
            <button class="center_align">
              ${sort_index === 3 ? "되돌리기" : "휴지통으로"}<svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                />
              </svg>
            </button>
          </div>
        </div>
                  `;
            movies_container.append(card);
          }
          const likeBtns = $(".movie_btns > button:nth-child(1)");
          for (let i = 0; i < likeBtns.length; i++) {
            likeBtns[i].addEventListener("click", () => clickLike(likeBtns[i]));
          }
          const deleteBtns = $(".movie_btns > button:nth-child(2)");
          for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", () =>
              clickDelete(deleteBtns[i])
            );
          }
        }
      },
    });
  });
}

listingMovies();

$(document).ready(() => {
  const sort_btns = $(".sort_btns > button");
  for (let i = 0; i < 4; i++) {
    sort_btns[i].addEventListener("click", () => listingMovies(i));
  }
});

function clickLike(element) {
  const title =
    element.parentElement.parentElement.querySelector(".movie_title").innerText;

  $.ajax({
    type: "POST",
    url: "/api/like/movie",
    data: {
      title,
    },
    success: function (response) {
      if (response.ok) {
        listingMovies(sort_index);
      }
    },
  });
}

function clickDelete(element) {
  const title =
    element.parentElement.parentElement.querySelector(".movie_title").innerText;

  $.ajax({
    type: "POST",
    url: "/api/delete/movie",
    data: {
      title,
    },
    success: function (response) {
      if (response.ok) {
        listingMovies(sort_index);
      }
    },
  });
}
