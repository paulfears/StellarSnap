import re

def wrap_in_string(js_code):
    # Escape backticks, backslashes, and dollar signs
    escaped_code = re.sub(r'\\|`|\$', r'\\\g<0>', js_code)
    # Wrap in backticks
    wrapped_code = f'`{escaped_code}`'
    return wrapped_code

def process_file(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as infile:
            js_code = infile.read()
        
        wrapped_js = wrap_in_string(js_code)
        
        with open(output_file, 'w', encoding='utf-8') as outfile:
            outfile.write(wrapped_js)
        
        print(f"Wrapped JavaScript code has been written to {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
input_file = './jsString.ts'
output_file = 'jsStringEsc.ts'
process_file(input_file, output_file)
