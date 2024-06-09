from fontTools.ttLib import TTFont

# OTF 파일 열기
font = TTFont('Redaction10-Regular.otf')

# 폰트 정보 출력
font.saveXML('result.xml')