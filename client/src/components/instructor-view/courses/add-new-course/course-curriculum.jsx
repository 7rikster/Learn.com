import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaDeleteService, mediaUploadService } from "@/services";
import { useContext } from "react";


function CourseCurriculum() {

    const {courseCurriculumFormData, setCourseCurriculumFormData,mediaUploadProgress, setMediaUploadProgress,mediaUploadProgressPercentage, setMediaUploadProgressPercentage} = useContext(InstructorContext);
    
    function handleAddNewLecture(){
        setCourseCurriculumFormData([
            ...courseCurriculumFormData,
            {
                ...courseCurriculumInitialFormData[0]
            }
        ])
    }

    function handleCourseTitleChange(event,currentIndex){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            title:event.target.value
        }
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

    function handleFreePreviewChange(value,currentIndex){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            freePreview: value 
        }
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

    async function handleSingleLectureUpload(event,currentIndex){
        const selectedFile = event.target.files[0];

        if(selectedFile){
            const videoFormData = new FormData();
            videoFormData.append('file', selectedFile);

            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
                
                if(response.success){
                    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
                    cpyCourseCurriculumFormData[currentIndex] = {
                        ...cpyCourseCurriculumFormData[currentIndex],
                        videoUrl: response?.data?.url,
                        public_id: response?.data?.public_id
                    }
                    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
                    setMediaUploadProgress(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    function isCourseCurriculumFormDataValid(){
        return courseCurriculumFormData.every((item)=>{
            return (item && typeof item === 'object' &&  item.title.trim() !== '' && item.videoUrl.trim() !== '');
        })
    }

    async function handleReplaceViddeo(index){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        const currentVideoPublicId = cpyCourseCurriculumFormData[index].public_id;

        const deleteCurrentMediaResponse = await mediaDeleteService(currentVideoPublicId);
        if(deleteCurrentMediaResponse.success){
            cpyCourseCurriculumFormData[index] = {
                ...cpyCourseCurriculumFormData[index],
                videoUrl: '',
                public_id: ''
            }
            setCourseCurriculumFormData(cpyCourseCurriculumFormData);
        }
    }

    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Create Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleAddNewLecture} disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}>Add Lecture</Button>
                {
                    mediaUploadProgress ? 
                    <MediaProgressBar 
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgressPercentage}
                    /> : null
                }
                <div className="mt-4 space-y-4">
                    {
                        courseCurriculumFormData.map((curriculumItem, index)=>(
                            <div className="border p-5 rounded-md" key={index}>
                                <div className="flex gap-5 items-center">
                                    <h3 className="font-semibold">Lecture {index+1}</h3>
                                    <Input
                                    name={`title-${index+1}`}
                                    placeholder="Enter Lecture title"
                                    className="max-w-96"
                                    onChange={(e)=>handleCourseTitleChange(e,index)}
                                    value={courseCurriculumFormData[index]?.title}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                        onCheckedChange={(value)=>handleFreePreviewChange(value,index)}
                                        checked={courseCurriculumFormData[index]?.freePreview}
                                        id={`freePreview-${index}`}
                                        />
                                        <Label htmlFor={`freePreview-${index}`}>Free preview</Label>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {
                                        courseCurriculumFormData[index]?.videoUrl ?
                                        <div className="flex gap-3">
                                            <VideoPlayer url={courseCurriculumFormData[index].videoUrl}
                                            width="450px"
                                            height="200px"
                                            /> 
                                            <Button onClick={()=>handleReplaceViddeo(index)} >Replace video</Button>
                                            <Button className="bg-red-900">Delete video</Button>
                                        </div>:
                                        <Input
                                        type="file"
                                        accept="video/*"
                                        onChange={(event)=> handleSingleLectureUpload(event,index)}
                                        />
                                    }

                                    
                                </div>
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
     );
}

export default CourseCurriculum;