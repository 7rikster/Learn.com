const Course = require('../../models/Course');

const getAllStudentViewCourses = async(req, res) => {
    try {
        const {category = [], level = [], primaryLanguage = [], sortBy="price-lowtohigh"} = req.query;

        let filters = {};
        if(category.length>0){
            filters.category = {$in: category.split(',')};
        }
        if(level.length>0){
            filters.level = {$in: level.split(',')};
        }
        if(primaryLanguage.length>0){
            filters.primaryLanguage = {$in: primaryLanguage.split(',')};
        }

        let sortParams = {};
        switch (sortBy) {
            case "price-lowtohigh":
                sortParams.pricing = 1;
                break;
            case "price-hightolow":
                sortParams.pricing = -1;
                break;
            
            case "title-atoz":
                sortParams.title = 1;
                break;
            case "title-ztoa":
                sortParams.title = -1;
                break;
        
            default:
                sortParams.pricing = 1;
                break;
        }

        const courseList = await Course.find(filters).sort(sortParams);
        
        res.status(200).json({
            success: true,
            data: courseList
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        })
    }
}

const getStudentViewCoursesDetails = async(req, res) => {
    try {
        const {id} = req.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "No course found",
                data:null
            })
        }
        res.status(200).json({
            success: true,
            data: courseDetails
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        })
    }
}


module.exports = {getAllStudentViewCourses, getStudentViewCoursesDetails};