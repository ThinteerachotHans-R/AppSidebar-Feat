import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


const messagedata = [
    {Category: 'General', Message:'This is a general message. I have been working on this for ten minutes. All in this message will be about general things that I want to say. I enjoy sleeping as much as I enjoy playing games. Nevertheless, I have to work on myself about coding skills as my senior project requires me to do so.'},
    {Category: 'Announcement',Message: 'I currently working on this one. I am sure that you guys would like it.'},
    {Category:'Likes',Message:'I enjoy reading books as books give me wisdom and knowledge. Moreover, books are the best resource for learning and entertainment. We can learn about different subjects such as science, history, economics, psychology or even how authors view incidents in their perspective.'}
]


const Message = () =>{

    return(
        <div className=" w-100  flex items-center justify-center">
            <Tabs defaultValue = "general" className = "flex flex-col gap-3">
                <TabsList className="bg-transparent border-b-2 w-full justify-start border-zinc-200">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="announcement">Announcement</TabsTrigger>
                    <TabsTrigger value="likes">Likes</TabsTrigger>
                </TabsList>
                {messagedata.map((item) => (
                    <TabsContent key={item.Category} value={item.Category.toLowerCase().replace(/\s/g, '')}>
                        <Card>  
                            <CardHeader>
                                <CardTitle>{item.Category}</CardTitle>
                                <CardDescription>This is a message about {item.Category}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {item.Message}
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>

    )
}

export default Message