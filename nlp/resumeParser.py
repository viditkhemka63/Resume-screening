from pyresparser import ResumeParser

import io
import os
import re
import nltk
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFSyntaxError
import wget
import pdfx


url = 'https://viditkhemka00.s3.amazonaws.com/Vidit.pdf'  

def extractLink(path):
    pdf = pdfx.PDFx(path)
    urls =  pdf.get_references_as_dict()
    if 'url' in list(urls.keys()):
        return urls[url]
    return []

def serializeJSON(json_data):
    result = {}

    for key in list(json_data.keys()):
        if type(json_data[key]) == type([]):
           result[key] = "$".join(json_data[key])
        else:
          result[key] = str(json_data[key])

    return result

def parseResume(url):
    fileName = downloadFile(url)
    data = extractInfo(fileName)
    data['resume'] = pdf_to_text(fileName)
    data = serializeJSON(data)
    os.remove(fileName)
    return data

def downloadFile(url):
    filename = url.split('/')[-1]
    wget.download(url, filename) 
    return filename


def extractInfo(path):
    data = ResumeParser(path).get_extracted_data()
    return data

def pdf_to_text(path):
    mygen = extract_text_from_pdf(path)
    resume = []
    for item in mygen:
        resume.append(item)

    return ' '.join(resume)

def extract_text_from_pdf(pdf_path):
    
    if not isinstance(pdf_path, io.BytesIO):
        # extract text from local pdf file
        with open(pdf_path, 'rb') as fh:
            try:
                for page in PDFPage.get_pages(
                        fh,
                        caching=True,
                        check_extractable=True
                ):
                    resource_manager = PDFResourceManager()
                    fake_file_handle = io.StringIO()
                    converter = TextConverter(
                        resource_manager,
                        fake_file_handle,
                        
                        laparams=LAParams()
                    )
                    page_interpreter = PDFPageInterpreter(
                        resource_manager,
                        converter
                    )
                    page_interpreter.process_page(page)

                    text = fake_file_handle.getvalue()
                    yield text

                    # close open handles
                    converter.close()
                    fake_file_handle.close()
            except PDFSyntaxError:
                return
    else:
        # extract text from remote pdf file
        try:
            for page in PDFPage.get_pages(
                    pdf_path,
                    caching=True,
                    check_extractable=True
            ):
                resource_manager = PDFResourceManager()
                fake_file_handle = io.StringIO()
                converter = TextConverter(
                    resource_manager,
                    fake_file_handle,
                    laparams=LAParams()
                )
                page_interpreter = PDFPageInterpreter(
                    resource_manager,
                    converter
                )
                page_interpreter.process_page(page)

                text = fake_file_handle.getvalue()
                yield text

                # close open handles
                converter.close()
                fake_file_handle.close()
        except PDFSyntaxError:
            return


