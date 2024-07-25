import os
import google.generativeai as genai
import google.ai.generativelanguage as glm
from google.generativeai.types.content_types import *
from PIL import Image
import json
from dotenv import load_dotenv
import ast
import re
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    
genai.configure(api_key=GOOGLE_API_KEY)
parser = StrOutputParser()


def describe(image_path):
    prompt = """
    !!IMPORTANT!! - Make sure you follow the format strictly as given below.

    Describe the image exactly and tell me exactly what is happening

    """
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    image = Image.open(image_path)
    response = model.generate_content([prompt, image])
    print(response.text)
    return response.text

def verify(description, deed):
    template="""Your job is to verify if a particular deed has been performed based on the description given.
                The description is as follows: {desc}. The deed is as follows: {deed}. 
                Based on the description, has the deed been performed? If yes, respond with 'yes'. If no, respond with 'no'.
                
                NOTE: Please respond with 'yes' or 'no' only.
             """
    prompt = ChatPromptTemplate.from_template(template)
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro")
    chain = prompt|llm|parser
    g=chain.invoke({"desc":description, "deed":deed})
    print(";"+g+";")
    return g


if __name__ == '__main__':
    image_path = r"C:\Users\sange\OneDrive\Desktop\doraa\web3heks\backend\images\plant.jpg"
    ds=describe(image_path)
    print( ds)
    print(verify(ds, "I planted a car"))
    
    