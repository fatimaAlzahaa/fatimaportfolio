// const Project = require('../Models/project');
// const fs = require('fs');
// const path = require('path');

// // CREATE a new project with image upload
// exports.createProject = async (req, res) => {
//     try {
//         const { title, description, technologies, link } = req.body;
//         const image = req.file ? req.file.filename : null;

//         const newProject = new Project({
//             title,
//             description,
//             technologies: technologies.split(','),
//             link,
//             image
//         });

//         const savedProject = await newProject.save();
//         res.status(201).json(savedProject);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // READ all projects
// exports.getAllProjects = async (req, res) => {
//     try {
//         const projects = await Project.find();
//         res.status(200).json(projects);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // READ a single project by ID
// exports.getProjectById = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         if (!project) return res.status(404).json({ message: 'Project not found' });
//         res.status(200).json(project);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };



// exports.updateProject = async (req, res) => {
//   try {
//       const project = await Project.findById(req.params.id);
//       if (!project) return res.status(404).json({ message: 'Project not found' });

//       const { title, description, technologies, link } = req.body;
//       const image = req.file ? req.file.filename : project.image;

//       if (req.file && project.image) {
//           // Delete the old image if a new one is uploaded
//           const imagePath = path.join(__dirname, '../uploads/projects/', project.image);
//           if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//       }

//       project.title = title;
//       project.description = description;
//       project.technologies = typeof technologies === 'string' ? technologies.split(',') : Array.isArray(technologies) ? technologies : [];
//       project.link = link;
//       project.image = image;

//       const updatedProject = await project.save();
//       res.status(200).json(updatedProject);
//   } catch (err) {
//       res.status(400).json({ message: err.message });
//   }
// };


// // DELETE a project by ID and remove associated image
// exports.deleteProject = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         if (!project) return res.status(404).json({ message: 'Project not found' });

//         if (project.image) {
//             // Delete the image file if it exists
//             const imagePath = path.join(__dirname, '../uploads/projects/', project.image);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }

//         await project.delete();
//         res.status(200).json({ message: 'Project deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


const Project = require('../Models/project');
const fs = require('fs');
const path = require('path');

// CREATE a new project with image upload
exports.createProject = async (req, res) => {
    try {
        const { title, description, technologies, link } = req.body;
        const image = req.file ? req.file.filename : null;

        // Ensure technologies is an array
        const techArray = Array.isArray(technologies) ? technologies : typeof technologies === 'string' ? technologies.split(',') : [];

        const newProject = new Project({
            title,
            description,
            technologies: techArray,
            link,
            image
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// READ all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE a project by ID
// exports.updateProject = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         if (!project) return res.status(404).json({ message: 'Project not found' });

//         const { title, description, technologies, link } = req.body;
//         const image = req.file ? req.file.filename : project.image;

//         if (req.file && project.image) {
//             // Delete the old image if a new one is uploaded
//             const imagePath = path.join(__dirname, '../uploads/projects/', project.image);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }

//         // Ensure technologies is an array
//         const techArray = Array.isArray(technologies) ? technologies : typeof technologies === 'string' ? technologies.split(',') : [];

//         project.title = title;
//         project.description = description;
//         project.technologies = techArray;
//         project.link = link;
//         project.image = image;

//         const updatedProject = await project.save();
//         res.status(200).json(updatedProject);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // DELETE a project by ID and remove associated image
// exports.deleteProject = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);
//         if (!project) return res.status(404).json({ message: 'Project not found' });

//         if (project.image) {
//             // Delete the image file if it exists
//             const imagePath = path.join(__dirname, '../uploads/projects/', project.image);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }

//         // Use deleteOne() to delete the document
//         await Project.deleteOne({ _id: req.params.id });
//         res.status(200).json({ message: 'Project deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.updateProject = async (req, res) => {
  try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      const { title, description, technologies, link } = req.body;

      // Validate required fields
      if (!title || !description) {
          return res.status(400).json({ message: 'Title and description are required.' });
      }

      const image = req.file ? req.file.filename : project.image;

      if (req.file && project.image) {
          // Delete the old image if a new one is uploaded
          const imagePath = path.join(__dirname, '../uploads/projects/', project.image);
          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
          }
      }

      // Ensure technologies is an array
      const techArray = Array.isArray(technologies) ? technologies : typeof technologies === 'string' ? technologies.split(',') : [];

      project.title = title;
      project.description = description;
      project.technologies = techArray;
      project.link = link;
      project.image = image;

      const updatedProject = await project.save();
      res.status(200).json(updatedProject);
  } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      if (project.image) {
          // Delete the image file if it exists
          const imagePath = path.join(__dirname, '../uploads/projects/', project.image);
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }

      // Use deleteOne() to delete the document
      await Project.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


