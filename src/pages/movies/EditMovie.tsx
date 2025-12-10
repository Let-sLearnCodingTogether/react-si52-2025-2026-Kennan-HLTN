import { NavLink, useParams } from "react-router"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState, useCallback, useEffect } from "react"
import type { ChangeEvent } from "react"
import ApiClient from "../../utils/ApiClient"

interface formMovie {
    title : string,
    releaseDate : string,
    director : string
}

interface ResponseData{
    data : {
        _id : string,
        title : string,
        releaseDate : string,
        director : string,
        createdAt : string,
        updatedAt : string,
        _v : string
    },

    message:string
}

function EditMovie(){
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState<formMovie>({
        title : "",
        releaseDate : "",
        director : ""
    })

    const fetchMovie = useCallback(async () => {
        const response = await ApiClient.get(`/movies/${params.id}`)

        if(response.status === 200) {
            const responseData : ResponseData = response.data
            setForm({
                title : responseData.data.title,
                releaseDate : responseData.data.releaseDate,
                director : responseData.data.director
            })
        }
    }, [params])

    useEffect(() => {
        fetchMovie()
    }, [fetchMovie])

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm ({
            ...form,
            [name] : value
        })
    }
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const response = await ApiClient.post("/movie", form)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return <div>
    <div className="d-flex justify-content-between mb-3">
        <h2>Add Movie Page</h2>
        <NavLink to="/" className="btn btn-primary">Movies</NavLink>

    </div>
    <div>
        <Form onSubmit = {handleSubmit}>
            <Form.Group className="mb-3" controlId="formJudul">
                <Form.Label>judul</Form.Label>
                <Form.Control 
                value={form.title}
                    name="title" 
                    onChange={handleInputChange}
                    type="text" 
                    placeholder = "Judul Film"/>
            </Form.Group>
            <Form.Group className="mb-3"controlId="formTahunRilis">
                <Form.Label>tahunRilis</Form.Label>
                <Form.Control 
                value={form.releaseDate}
                    name="releaseDate" 
                    onChange={handleInputChange}
                    type="text" 
                    placeholder = "Tahun Rilis"/>
            </Form.Group>
            <Form.Group className="mb-3"controlId="formSutradara">
                <Form.Label>sutradara</Form.Label>
                <Form.Control 
                value={form.director}
                    name="director" 
                    onChange={handleInputChange}
                    type="text" 
                    placeholder = "Sutradara"/>
            </Form.Group>

            <Button type="submit" variant="primary">
                Simpan
            </Button>
        </Form>
    </div>
    </div>
}

export default EditMovie