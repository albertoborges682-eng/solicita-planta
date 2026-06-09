from sqlalchemy import Column, Integer, String
from database import Base

class Solicitacao(Base):
    __tablename__ = "solicitacoes"

    id = Column(Integer, primary_key=True, index=True)
    protocolo = Column(String, unique=True, index=True)
    nome = Column(String)
    cpf = Column(String)
    telefone = Column(String)
    endereco = Column(String)
    tipo_projeto = Column(String)
    descricao = Column(String)
    status = Column(String)