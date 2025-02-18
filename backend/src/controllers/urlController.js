const Url = require("../models/Url");
const { frontendUrl } = require("../utils/frontendUrl");
const generateUrl = require("../utils/generateUrl");

exports.createUrl = async (req, res) => {
  const { destination, userId, title } = req.body;
  const shortenId = generateUrl();
  const shortenUrl = `${frontendUrl}/${shortenId}`;

  if (!destination) {
    return res.status(400).json({ error: "Enter a Url" });
  }

  try {
    const url = new Url({
      title: title || undefined,
      destination,
      shortenUrl,
      userId: userId || undefined,
    });

    await url.save();

    return res.status(201).json({ shortenUrl });
  } catch (error) {
    console.log("Error in createUrl controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.gotoUrl = async (req, res) => {
  const { shortenId } = req.params;

  try {
    const url = await Url.findOne({
      shortenUrl: `${frontendUrl}/${shortenId}`,
    });

    if (!url) {
      return res.status(404).json({ message: "Url Not Found" });
    }

    return res.status(200).json({ destination: url.destination });
  } catch (error) {
    console.log("Error in gotoUrl controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editUrl = async (req, res) => {
  const { id, title, destination } = req.body;

  try {
    const oldUrl = await Url.findById(id);

    if (!oldUrl) {
      return res.status(404).json({ message: "URL Not Found" });
    }

    oldUrl.title = title || oldUrl.title;
    oldUrl.destination = destination || oldUrl.destination;

    await oldUrl.save();

    return res.status(200).json({
      message: "URL updated successfully",
      title: oldUrl.title,
      destination: oldUrl.destination,
    });
  } catch (error) {
    console.log("Error in editUrl controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUrls = async (req, res) => {
  const { userId } = req.params;

  try {
    const urls = await Url.find({ userId }).select("-userId");

    return res.status(200).json(urls);
  } catch (error) {
    console.log("Error in getUrls controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUrl = async (req, res) => {
  const { id } = req.query;

  try {
    const url = await Url.findOneAndDelete({ _id: id });

    if (!url) {
      return res.status(404).json({ message: "URL Not Found" });
    }

    return res.status(200).json({ success: "URL Deleted", url });
  } catch (error) {
    console.log("Error in deleteUrl controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
