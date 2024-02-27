function loadRepas() {
  fetch("source/repas.json")
    .then((response) => response.json())
    .then((data) => {
      data.repasts.sort((a, b) => new Date(a.date) - new Date(b.date));

      const currentDate = new Date();

      const upcomingMeals = data.repasts.filter(
        (meal) => new Date(meal.date) >= currentDate
      );

      const nextmealElement = document.getElementById("nextmeal");
      const mealListElement = document.getElementById("mealList");
      if (upcomingMeals.length > 0) {
        nextmealElement.innerHTML += generateMealHTML(upcomingMeals[0]);

        upcomingMeals.forEach((meal) => {
          mealListElement.innerHTML += generateMealHTML(meal);
        });
      } else {
        mealListElement.innerHTML = "<p>Aucun repas à venir.</p>";
      }
    })
    .catch((error) =>
      console.error("Erreur de chargement du fichier JSON:", error)
    );
}

function loadActivites() {
  fetch("source/activites.json")
    .then((response) => response.json())
    .then((data) => {
      data.activities.sort((a, b) => new Date(a.date) - new Date(b.date));

      const currentDate = new Date();

      const upcomingActivities = data.activities.filter(
        (activity) => new Date(activity.date) >= currentDate
      );
      const activityListElement = document.getElementById("activitiesList");
      if (upcomingActivities.length > 0) {
        upcomingActivities.forEach((activity) => {
          activityListElement.innerHTML += generateActivityHTML(activity);
        });
      } else {
        activityListElement.innerHTML = "<p>Aucune activité à venir.</p>";
      }
    })
    .catch((error) =>
      console.error("Erreur de chargement du fichier JSON:", error)
    );
}

function generateMealHTML(meal) {
  const formattedDate = new Date(meal.date).toLocaleString("fr-FR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return `
    <div class="meal">
      <h3>${formattedDate}</h3>
      <h2>${meal.type}</h2>
      ${meal.menu.entree != undefined ? `<p>${meal.menu.entree}</p>` : ""}
      ${meal.menu.plat != undefined ? `<p>${meal.menu.plat}</p>` : ""}
      ${
        meal.menu.accompagnement != undefined
          ? `<p>${meal.menu.accompagnement}</p>`
          : ""
      }
      ${meal.menu.dessert != undefined ? `<p>${meal.menu.dessert}</p>` : ""}
    </div>
    `;
}

function generateActivityHTML(activity) {
  const formattedDate = new Date(activity.date).toLocaleString("fr-FR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return `
    <div class="activity">
      <h3>${formattedDate}</h3>
      <h2>${activity.title}</h2>
    </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  loadRepas();
  loadActivites();
});
