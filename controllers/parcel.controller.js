const xml2js = require("xml2js");
const Parcel = require("../models/parcel.model");

const uploadXmlAndSaveParcels = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No XML file uploaded" });
    }

    const xmlData = req.file.buffer.toString("utf-8");

    xml2js.parseString(xmlData, { explicitArray: false }, async (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Invalid XML format" });
      }

      if (!result?.Container?.parcels?.Parcel) {
        return res.status(400).json({ message: "Invalid XML structure" });
      }

      const parcels = result.Container.parcels.Parcel;
      const parcelsArray = Array.isArray(parcels) ? parcels : [parcels];

      const savedParcels = [];

      for (const p of parcelsArray) {
        const parcel = new Parcel({
          name: p.Receipient.Name,
          weight: Number(p.Weight),
          value: Number(p.Value),
          address: {
            street: p.Receipient.Address.Street,
            houseNumber: p.Receipient.Address.HouseNumber,
            postalCode: p.Receipient.Address.PostalCode,
            city: p.Receipient.Address.City,
          },
        });

        const saved = await parcel.save();
        savedParcels.push(saved);
      }

      return res.status(201).json({
        message: "Parcels uploaded successfully",
        totalSaved: savedParcels.length,
        parcels: savedParcels,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {uploadXmlAndSaveParcels}