CREATE TABLE IF NOT EXISTS "guidesplaces" ("placeId" INTEGER , "guideId" INTEGER , "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, PRIMARY KEY ("placeId","guideId"));
CREATE TABLE IF NOT EXISTS "categories" ("id"   SERIAL , "name" VARCHAR(255), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "categoryId" INTEGER, "guideId" INTEGER, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "guides" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "city" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "locations" ("id"   SERIAL , "address" VARCHAR(255), "city" VARCHAR(255), "country" VARCHAR(255), "lat" FLOAT, "lng" FLOAT, "postalCode" INTEGER, "state" VARCHAR(255), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "placeId" INTEGER, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "places" ("id"   SERIAL , "name" VARCHAR(255), "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "guideId" INTEGER, "locationId" INTEGER, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "guidesplaces" ("placeId" INTEGER , "guideId" INTEGER , "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, PRIMARY KEY ("placeId","guideId"));
