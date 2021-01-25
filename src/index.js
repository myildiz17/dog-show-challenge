document.addEventListener("DOMContentLoaded", () => {
  const ce = (tag) => {
    return document.createElement(tag);
  };

  const qs = (selector) => {
    return document.querySelector(selector);
  };
  const form = qs("#dog-form");

  const URL = "http://localhost:3000/dogs";

  const fetchDogs = () => {
    fetch(URL)
      .then((response) => response.json())
      .then((dogs) => renderDogs(dogs));
  };

  const renderDogs = (dogs) => {
    dogs.forEach((dog) => {
      const tr = ce("tr");
      tr.setAttribute("data-dogId", dog.id);
      const td1 = ce("td");
      td1.innerText = dog.name;
      const td2 = ce("td");
      td2.innerText = dog.breed;
      const td3 = ce("td");
      td3.innerText = dog.sex;
      const td4 = ce("td");
      const btn = ce("button");
      btn.innerText = "Edit";
      btn.addEventListener("click", (e) => {
        form[0].value = dog.name;
        form[1].value = dog.breed;
        form[2].value = dog.sex;
        // debugger

        const hiddenInput = ce("input");
        hiddenInput.setAttribute("type", "hidden");
        hiddenInput.value = dog.id;
        form.append(hiddenInput);
        // debugger
      });
      td4.append(btn);
      tr.append(td1, td2, td3, td4);
      const tableBody = qs("#table-body");

      tableBody.append(tr);
      // debugger
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: e.target[0].value,
      breed: e.target[1].value,
      sex: e.target[2].value,
    };

    fetch(URL + "/" + e.target[4].value, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newDog) => {
        const allTr = document.querySelectorAll("tr");
        const finalArr = Array.from(allTr).slice(1);
        const arrNeeded = finalArr.find((el) => el.dataset.dogid == newDog.id);
        arrNeeded.children[0].innerText = newDog.name;
        arrNeeded.children[1].innerText = newDog.breed;
        arrNeeded.children[2].innerText = newDog.sex;
      });
  });

  fetchDogs();
});
