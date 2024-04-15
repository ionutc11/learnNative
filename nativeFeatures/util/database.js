import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";

const db = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, lat, lng) VALUES (? , ? , ?, ? )`,
        [place.title, place.imageUri, place.location.lat, place.location.lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array) {
            const place = new Place(
              dp.title,
              dp.imageUri,
              { lat: dp.lat, lng: dp.lng },
              dp.id
            );
            places.push(place);
          }
          resolve(places);
        },
        (_, error) => {
          console.log(err);
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaceById(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
