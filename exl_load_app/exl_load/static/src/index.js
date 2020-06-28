import React from 'react'
import Dropzone from 'react-dropzone'
import ReactDOM, { render } from 'react-dom';
import './theme.css';
import StickyHeadTable from './modules/table';

function createData(id, name, created) {
  return { id, name, created };
}



class Dz extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            rows: []
        }

    }
    get_list_documents(){

    }
    componentDidMount() {
        this.get_data_document()

    }
    get_data_document(){
        let rows = []
        fetch('/get_documents/').then(res => res.json())
        .then(
            (result) => {
                result.map((item) => {
                    rows.push(createData(item.id,item.name,item.created))
                })
                this.setState({rows:rows})
            }
        )
    }
    loading(files){
        files.map((item) => {
            const formData = new FormData();
            formData.append('file', item)
            fetch('/loading/', {
                method: 'POST',
                body: formData,
            }).then(function (response) {
                if (response.status !== 200) {
                alert('Не вышло');
              }else {
                    return response.json()
              }

            }).then((data) =>{
                this.get_data_document()
            })
        })
    }
    indicator(files){
        if(files) {
            console.log(files)
            this.setState({files: files})
            this.loading(files)
        }
    }
    render() {
        return <div>
            {
                this.state.rows != []?
                    <StickyHeadTable rows={this.state.rows}/>
                :''
            }
                <Dropzone onDrop={acceptedFiles => this.indicator(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section className={'dropzone'}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Переместите сюда файлы</p>
                  <div className={'indicator'}>
                      {
                          this.state.files ?
                              this.state.files.map((item) =>
                                  <div className={'indicator_item'}>{item.name} размер:{item.size}</div>
                              )
                              :''
                      }
                  </div>
              </div>
            </section>
          )}
                </Dropzone>
            </div>
    }
}

ReactDOM.render(<Dz />, document.getElementById('root'));