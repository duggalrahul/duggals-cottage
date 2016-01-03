rooms = new Mongo.Collection("rooms");
tarriffs = new Mongo.Collection("tarriffs");
images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

