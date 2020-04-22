import React, { useState } from 'react';
import { Button, Separator, Modal, Input, CheckBox, Dropdown } from 'newhappen-ui';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [listCreateForm, setListCreateForm] = useState([{fields: [], types: []}]);
  const [listPreCreateForm, setListPreCreateForm] = useState([{fields: [], types: []}]);
  const [createdList, setCreatedList] = useState([{fields: [], types: []}]);
  const [forms, setForms] = useState([]);
  const [preCreate, setPreCreate] = useState(false);
  const [sobreCheck, setSobreCheck] = useState('');
  const [optionsCheck, setOptionsCheck] = useState('');
  const [titleForm, setTitleForm] = useState('');
  const [textForm, setTextForm] = useState('');
  const [editingCheckbox, setEditingCheckbox] = useState(false);
  const [indexText, setIndexText] = useState();
  const [editForm, setEditForm] = useState(false);
  const [duplicateForm, setDuplicateForm] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editOther, setEditOther] = useState(false);

  return (
    <div className='projects-adm-container'>
      <header className='projects-adm-header'>
        <h3>Olá, projeto social</h3>
        <Button>Mandar e-mails</Button>
      </header>
      <div className='projects-adm-separator'>
        <Separator/>
      </div>
      <div className='projects-adm-content'>
        <div className='projects-adm-card-container'>
          <h4>Formulários</h4>
          <h5>Criar formulários</h5>
          <h5>Crie formulários como ninguém! Formulários podem ser uteis para automatizar processos de inscrição e pesquisas, por exemplo.</h5>
          <Button style={{width: '100%'}} onClick={() => {setOpen(true); setCreateForm(true)}}>Criar Forms</Button>
          <h5 style={{marginTop: 10}}>Seus formulários</h5>
          
          {
            forms.map((el, index) => (
              <div key={index} className='projects-adm-card'>
                <h4>{el.title}</h4>
                <div className="projects-adm-actions-card">
                  <h5 style={{cursor: 'pointer'}} onClick={() => {
                    setEditForm(true); 
                    setOpen(true); 
                    setCreateForm(false);
                    setCreatedList([el]);
                  }}>Editar</h5>
                  <h5 style={{cursor: 'pointer'}} onClick={() => {
                    setForms([...forms, {title: `${el.title} duplicado`, fields: el.fields, types: el.types, values: []}])
                  }}>Duplicar</h5>
                  <h5>Adicionar dados</h5>
                  <h5 style={{cursor: 'pointer'}} onClick={() => {
                    var list = forms.slice();
                    list.splice(index, 1);
                    setForms(list)
                  }}>Excluir</h5>
                </div>
              </div>
            ))
          }

        </div>
        
        <div className='projects-adm-card-container'>
          <h4>Fichas de presença</h4>
          <h5>Criar fichas</h5>
          <h5>Se seu formulário ou projeto precisa de uma lista de presença, esse é o lugar certo para cria-la</h5>
          <Button style={{width: '100%'}}>Criar ficha vazia</Button>
          <Button style={{marginTop: 10, width: '100%'}}>Criar ficha de um forms</Button>
          <h5 style={{marginTop: 10, width: '100%'}}>Suas fichas</h5>
          
            <div className='projects-adm-card'>
              <h4>Título da ficha</h4>
              <div className="projects-adm-actions-card">
                <h5>Usar</h5>
                <h5>Excluir</h5>
              </div>
            </div>
        </div>

        <div className='projects-adm-card-container'>
          <h4>Recursos extras</h4>
          <Button style={{marginTop: 10, width: '100%'}}>Ver estatísticas</Button>
          <Button style={{marginTop: 10, width: '100%'}}>Gerar PDF estatístico</Button>
          <Button style={{marginTop: 10, width: '100%'}}>Mudar dados do projeto</Button>
          <Button style={{marginTop: 10, width: '100%'}}>Envie Feedbacks</Button>
        </div>
      </div>












      <Modal open={open} setOpen={() => setOpen(false)} style={{width: '70%', overflowY: 'scroll', height: '90%'}} title={
        createForm ? 'Criar formulário' : editForm ? 'Editar Formulário' : 'Modal' 
      }>
        {
          createForm ?
            <div style={{width: '100%', backgroundColor: '#0E222F', padding: 10}}>
              <h5>Nome do seu formulário</h5>
              <Input placeholder='Pode digitar' value={titleForm} setValue={(text) => setTitleForm(text)}/>
              { !preCreate ?
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                  <Button onClick={() => {setPreCreate(true); setListPreCreateForm([{fields: [], types: ['text']}])}}>Criar campo de texto</Button>
                  <Button onClick={() => {setPreCreate(true); setListPreCreateForm([{fields: [], types: ['checkbox']}])}}>Criar múltipla escolha</Button>
                  {/* <Button onClick={() => {setPreCreate(true); setListPreCreateForm([{fields: [], types: ['dropdown']}])}}>Criar caixa de seleção</Button> */}
                </div> : <div style={{marginBottom: 10, height: 5}}/>
              }
              { preCreate ? 
                <div>
                  <div>
                    {
                      listPreCreateForm[0].types.map((el, index) => {
                        if(el === 'text') {
                          return (<Input placeholder='Sobre o que é?' value={listPreCreateForm[0].fields[index]} setValue={(text) => setListPreCreateForm([{fields: [text], types: ['text']}])}/>)
                        } else if(el === 'checkbox' || el === 'dropdown') {
                          return (
                            <div>
                              <div style={{marginTop: 10}}>
                                <Input placeholder='Sobre o que é?' value={sobreCheck} setValue={(text) => setSobreCheck(text)}/>
                                <div style={{marginBottom: 10, height: 5}}/>
                              </div>
                              <h5>Digite todas as opções separadas por vírgula</h5>
                              <Input placeholder='Opções' value={optionsCheck} setValue={(text) => {setOptionsCheck(text)}}/>
                            </div>
                          ) 
                        }
                      })
                    }
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                    <Button onClick={() => {setPreCreate(false); setListPreCreateForm([{fields: [], types: []}])}}>Cancelar</Button>
                    <Button onClick={() => {
                      var list = listCreateForm.slice();
                      if(sobreCheck === ''){
                        list[0].fields.push(listPreCreateForm[0].fields[0]);                        
                      } else {
                        var listOptions = [];
                        var options = optionsCheck.split(',');
                        listOptions.push(sobreCheck);
                        console.log(sobreCheck)
                        for(var a = 0; a < options.length; a++){
                          listOptions.push(options[a]);
                        }
                        list[0].fields.push(listOptions);                        
                      }
                      list[0].types.push(listPreCreateForm[0].types[0]);
                      setListCreateForm(list);
                      setSobreCheck('');
                      setOptionsCheck('');
                      setPreCreate(false);
                    }}>Pronto</Button>
                  </div>
                </div> : 
                listCreateForm[0].types.map((el, index) => {
                  if(el === 'text') {
                    return (<Input placeholder={listCreateForm[0].fields[index]}/>)
                  } else if(el === 'checkbox') {
                    return (
                      <>
                        <h5>{listCreateForm[0].fields[index][0]}</h5>
                        {
                          listCreateForm[0].fields[index].map((el, index) => {
                            if(index > 0){
                              return <CheckBox label={el}/>
                            } else {
                              return null
                            }
                          })
                        }
                      </>
                    )
                  } else if(el === 'dropdown') {
                    return (
                      <>
                        <h5>{listCreateForm[0].fields[index][0]}</h5>
                        {
                          listCreateForm[0].fields[index].map((el, index) => {
                            if(index > 0){
                              return <Dropdown>
                                <option>{el}</option>
                              </Dropdown>
                            } else {
                              return null
                            }
                          })
                        }
                      </>
                    )
                  }
                })
              }
              <div>
                <Button onClick={() => {
                  var title = titleForm;
                  var fields = listCreateForm[0].fields;
                  var types = listCreateForm[0].types;
                  var list = { title: title, fields: fields, types: types, values: []};
                  var atualForms = forms.slice();
                  var newForms = [...atualForms, list];
                  setForms(newForms);
                  setTitleForm('');
                  setOptionsCheck('');
                  setCreateForm([{fields: [], types: []}]);
                  setListPreCreateForm([{fields: [], types: []}]);
                  setPreCreate(false);
                  setCreateForm(false);
                  setOpen(false);
                }}>Salvar</Button>
              </div>
            </div>
          : editForm ?
            <div style={{width: '100%', backgroundColor: '#0E222F', padding: 10}}>
              {
                createdList.map((el, index) => {
                  return (
                    <>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        {editTitle ? <Input placeholder={el.title} value={titleForm} setValue={(text) => setTitleForm(text)}/> : <h1>{el.title}</h1>}
                        {editTitle ? <>
                          <h6 onClick={() => {
                            var list = createdList.slice();
                            list[0].title = titleForm;
                            setCreatedList(list);
                            setTitleForm('');
                            setEditTitle(false); 
                          }} style={{cursor: 'pointer'}}>Pronto</h6>
                          <h6 onClick={() => {
                            setTitleForm('');
                            setEditTitle(false); 
                          }} style={{cursor: 'pointer'}}>Cancelar</h6>
                        </> 
                        : <h6 onClick={() => setEditTitle(true)} style={{cursor: 'pointer'}}>Editar título</h6>}
                      </div>
                      { editOther ? 
                        <>
                          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {
                              editingCheckbox ?
                                <>
                                  <div>
                                    <Input placeholder={createdList[0].fields[indexText][0]} value={sobreCheck} setValue={(text) => {
                                      setSobreCheck(text)
                                    }}/>
                                    <h5>Digite todas as opções separadas por vírgula</h5>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <Input placeholder='Opções' value={optionsCheck} setValue={(text) => {setOptionsCheck(text)}}/>
                                      <>
                                        <h6 onClick={() => {
                                          if(sobreCheck === ''){
                                            setSobreCheck(createdList[0].fields[indexText][0])
                                          }
                                          var listOptions = [];
                                          var options = optionsCheck.split(',');
                                          listOptions.push(sobreCheck);
                                          for(var a = 0; a < options.length; a++){
                                            listOptions.push(options[a]);
                                          }
                                          var list = createdList.slice();
                                          list[0].fields[indexText] = listOptions;                        
                                          setCreatedList(list);
                                          setTextForm('');
                                          setEditOther(false);
                                        }} style={{cursor: 'pointer'}}>Pronto</h6>
                                        <h6 onClick={() => {
                                          setTextForm('');
                                          setOptionsCheck('');
                                          setEditOther(false); 
                                          setEditingCheckbox(false);
                                        }} style={{cursor: 'pointer'}}>Cancelar</h6>
                                      </>
                                    </div>
                                  </div>
                                </>
                              : <>
                                <Input placeholder={createdList[0].fields[indexText]} value={textForm} setValue={(text) => {
                                  setTextForm(text)
                                }}/> 
                                <>
                                  <h6 onClick={() => {
                                    var list = createdList.slice();
                                    list[0].fields[indexText] = textForm;
                                    setCreatedList(list);
                                    setTextForm('');
                                    setEditOther(false);
                                  }} style={{cursor: 'pointer'}}>Pronto</h6>
                                  <h6 onClick={() => {
                                    setTextForm('');
                                    setEditOther(false); 
                                    setEditingCheckbox(false);
                                  }} style={{cursor: 'pointer'}}>Cancelar</h6>
                                </>
                              </> 
                            }
                          </div>
                        </>
                      : createdList[0].types.map((el, index) => {
                        if(el === 'text'){
                          return (
                            <>
                              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Input placeholder={createdList[0].fields[index]} value=''/>
                                <h6 onClick={() => {setEditOther(true); setIndexText(index); setEditingCheckbox(false)}} style={{cursor: 'pointer'}}>Editar Campo de Texto</h6>
                              </div>
                            </>
                          )
                        } else if(el === 'checkbox'){
                          return (
                            <>
                              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div>
                                  <h5>{createdList[0].fields[index][0]}</h5>
                                  {
                                    createdList[0].fields[index].map((el, index) => {
                                      if(index > 0){
                                        return <CheckBox label={el}/>
                                      } else {
                                        return null
                                      }
                                    })
                                  }
                                </div>
                                <h6 onClick={() => {setEditOther(true); setIndexText(index); setEditingCheckbox(true)}} style={{cursor: 'pointer'}}>Editar Checkbox</h6>
                              </div>
                            </>
                          )
                        }
                      })
                      }
                    </>
                  )
                })
              }
            </div>
          : <></>
        }
      </Modal>
    </div>
  );
}

export default App;
