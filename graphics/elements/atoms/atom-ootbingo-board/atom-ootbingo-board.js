(function () {
	'use strict';
	/**
	 * @customElement
	 * @polymer
	 * @appliesMixin Polymer.MutableData
	 */
	class AtomOotbingoBoard extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'atom-ootbingo-board';
		}

		static get properties() {
			return {
				lineFocused: {
					type: Boolean,
					value: true,
					reflectToAttribute: true,
					computed: '_computeLineFocused(board.lineFocused)'
				}
			};
		}

		_computeLineFocused(lineFocused) {
			return lineFocused;
		}

		_calcCells(cells, selectedLine, lineFocused) {
			if (!lineFocused || !selectedLine) {
				return cells;
			}

			switch (selectedLine) {
				case 'row1':
				case 'row2':
				case 'row3':
				case 'row4':
				case 'row5': {
					const rowIndex = parseInt(selectedLine.slice(3), 10) - 1;
					const rowStart = rowIndex * 5;
					return cells.slice(rowStart, rowStart + 5);
				}
				case 'col1':
				case 'col2':
				case 'col3':
				case 'col4':
				case 'col5': {
					const columnStart = parseInt(selectedLine.slice(3), 10) - 1;
					return [
						cells[columnStart],
						cells[columnStart + 5],
						cells[columnStart + 10],
						cells[columnStart + 15],
						cells[columnStart + 20]
					];
				}
				case 'tl-br': {
					return [
						cells[0],
						cells[6],
						cells[12],
						cells[18],
						cells[24]
					];
				}
				case 'bl-tr': {
					return [
						cells[20],
						cells[16],
						cells[12],
						cells[8],
						cells[4]
					];
				}
				default:
					return cells;
			}
		}

		_calcComplete(cell) {
			if (!cell || !cell.colors) {
				return false;
			}

			return cell.colors.length > 0 && cell.colors !== 'none' && cell.colors !== 'blank';
		}
	}

	customElements.define(AtomOotbingoBoard.is, AtomOotbingoBoard);
})();
